---
title: "Brauzer HTML-i DOM-a necə çevirir (render pipeline)"
date: "2025-12-05"
tags: ["Browser", "DOM", "Render pipeline", "Performance"]
summary: "Bu məqalə brauzerin HTML-i necə oxuyub DOM-a çevirdiyini və sonradan ekrana necə çəkdiyini addım-addım izah edir."
---
## 🌐 Ümumi Baxış

- Bütün UI framework-lər (React, Vue, Svelte və s.) real DOM ilə birbaşa yox, abstraksiyalarla (Virtual DOM, Reconciliation, Fiber) işləyir.
- Brauzerin öz “render” pipeline-ını bilmədən framework-lərdəki “render”-i tam anlamaq çətindir.

### 🌳 DOM Ağacı Necə Yaranır: Brauzer HTML-i Necə “Anlayır”?

Veb səhifəni açanda brauzer sadəcə HTML mətnini göstərmir — onu **oxuyur, təhlil edir və yaddaşda canlı bir ağac strukturu yaradır.** Bu struktur **DOM ağacı (Document Object Model Tree)** adlanır. Gəlin bu prosesi addım-addım başa düşək.

---

### 🧩  HTML-in Oxunması və Parsinq (Encoding daxil)

Sən [**https://example.com**](https://example.com/) yazırsan.

Brauzer [**https://example.com**](https://example.com/) ünvanına sorğu göndərir. Arxada bu baş verir:

1. DNS sorğusu — domenin IP ünvanı tapılır (məsələn, 93.184.216.34)
2. HTTPS bağlantısı — TCP handshake + TLS şifrələmə
3. HTTP GET sorğusu
4. Server cavabı — HTML faylını göndərir

Bu cavab iki hissədən ibarətdir:

```
HTTP Header-lər (metadata)
+
HTTP Body (faylın özü, məsələn HTML, JSON və ya şəkil)
```

```markup
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
Content-Length: 1234

<!DOCTYPE html>
<html>
 <head>
 <title>Mənim səhifəm</title>
 </head>
 <body>
 <h1>Salam Dünya</h1>
 </body>
</html>
```

Brauzer bu cavabı **baytlar** şəklində alır.Məsələn:

```
3C 21 44 4F 43 54 59 50 45 20 68 74 6D 6C 3E …
```

Brauzer aldığı byte-ları oxuyur və **encoding-ə** (məsələn UTF-8) əsasən simvollara çevirir.

### Encoding Nədir?

**Encoding** - simvolların rəqəmsal formada necə saxlanacağını müəyyən edən qayda.

```jsx
// ASCII encoding (sadə):
'A' = 65 (decimal) = 41 (hex)
'B' = 66 (decimal) = 42 (hex)

// UTF-8 encoding (daha geniş):
'A' = 41 (hex)
'ə' = C9 99 (hex) - 2 byte
'😀' = F0 9F 98 80 (hex) - 4 byte
```

---

Brauzer encoding-i burada tapır:

1) HTTP Header: `Content-Type: text/html; charset=UTF-8`

2) HTML `<meta charset="UTF-8">`

3) BOM: `EF BB BF` (UTF-8)

Burada brauzer üçün ən vacib hissə **Content-Type** və **charset** sətirləridir.

Çünki bu iki məlumat brauzerə deyir:

> “Mən sənə hansı tip məlumat göndərirəm və onu hansı kodlaşdırma ilə oxumalısan.”
> 

### `Content-Type`: Brauzerin nə aldığını anlaması

O, brauzerə **məzmunun növünü (MIME type)** bildirir.

| **Baytlar** | **Simvol** | **İzah** |
| --- | --- | --- |
| `3C 68 31 3E` | `<h1>` | HTML açılışı |
| `53 61 6C 61 6D` | Salam | Normal ASCII |
| `20` | (boşluq) | Space |
| `44 C3 BC 6E 79 61` | Dünya | "ü" üçün 2 bayt (C3 BC) |
| `3C 2F 68 31 3E` | `&lt;/h1&gt;` | HTML bağlanışı |
|  |  |  |

Nəticə: **Simvol səviyyəsində HTML parçası** yaranır və parser artıq bu mətni tokenləşdirməyə hazır olur.
### Əgər `charset` səhvdirsə nə baş verir?

`Tutaq ki, sənəddə əslində UTF-8 var, amma header-də charset=ISO-8859-1 yazılıb.`

Bu halda:

- "ə", "ü", "ö" kimi simvollar səhv oxunacaq;
- HTML sintaksisi pozula bilər (çünki `<` və `>` simvolları səhv deşifrə olunar);
- parser səhvləri bərpa etməyə çalışacaq və səhifə qarışıq görünəcək.

Ona görə də **doğru charset** həm backend, həm də frontend səviyyəsində eyni olmalıdır.

## Niyə bu mərhələ performansa təsir edir?

- Çünki bu deşifrə mərhələsi **streaming parser** zamanı baş verir.
    
    **Streaming parser** — brauzerin HTML sənədini **hissə-hissə, tam yüklənməsini gözləmədən** oxuyub təhlil etməsi prosesidir.
    
    Yəni brauzer serverdən HTML baytları gəldikcə onları dərhal simvollara, sonra tokenlərə çevirir və DOM ağacını qurmağa başlayır. Bütün faylın yüklənməsini gözləmir.
    
    Bu yanaşma performans üçün çox vacibdir:
    
    - Doğru charset təyin olunubsa, parser dərhal işə başlayır
    - Yanlış charset varsa, parser səhv tokenlər tapır və "recovery mode"-a keçir — bu da renderi ləngidir
    
    Beləliklə, **streaming parser** brauzerin sürətli və effektiv şəkildə səhifəni göstərməsini təmin edən mexanizmdir.
    

Brauzer HTML sənədini alarkən **hələ tam gəlməmiş hissələrini** belə oxuyur və DOM ağacına çevirir.

- Doğru charset → parser dərhal işə başlayır
- Yanlış charset → parser səhv tokenlər tapır və "recovery mode"-a keçir — bu da renderi ləngidir

---

### 2. Tokenləşdirmə (Tokenization)

Bu mərhələnin məqsədi brauzerin aldığı **simvol axınını** sintaktik vahidlərə (tokenlərə) çevirmək, onları **strukturlaşdırılmış DOM ağacına** salmaqdır.

Burada prosesi iki əsas modul idarə edir:

1. **Lexer (Tokenizator)** — mətni analiz edib tokenlərə bölür.
2. **Parser** — tokenləri qaydalar əsasında DOM strukturuna çevirir.

| Token tipi | Nümunə | İzah |
| --- | --- | --- |
| Start Tag | `<div>` | Yeni element açılır |
| End Tag | `</div>` | Element bağlanır |
| Doctype | `<!DOCTYPE html>` | Parsing rejimini müəyyən edir |
| Comment | `<!-- note --→` | DOM-a daxil olmur |
| Character | `Hello` | Mətn node-u yaradır |
| Attribute | `class="container"` | Atributlar  |

Bu tokenlər sonra **DOM ağacının qurulması** mərhələsinə ötürülür.

---

### 3. Ağacın Qurulması (Tree Construction)

Tokenlər hazır olduqdan sonra, Tree Builder moduluna ötürülür.

Burada **“insertion mode”** deyilən qaydalar toplusu işləyir.

Brauzer “stack” (yığın) strukturu ilə hər bir tag üçün obyekt (node) yaradır və onları **parent-child** **əlaqəsinə** görə birləşdirir.

### Node Nədir?

**Node** - DOM ağacının əsas vahidi, JavaScript obyekti.

Hər token bir və ya bir neçə **DOM Node** yaradır.

| Node növü | Məsələn | İzah |
| --- | --- | --- |
| `Document` | `document` | Kök obyekt, bütün DOM-u saxlayır |
| `Element` | `<div>`, `<p>` | HTML tag-ı təmsil edir |
| `Text` | “Salam Dünya” | Mətn hissəsi |
| `Attribute` | `class="intro”` | Elementə bağlı metadata |

Bu obyektlər JavaScript API-ləri ilə idarə olunur (`createElement`, `appendChild`, `setAttribute` və s.).

HTML:

```html
<p class="intro">Salam</p>
```

Tokenlər:

```
StartTag(name="p", attributes=[class="intro"])
Character("Salam")
EndTag(name="p")
```

Tree Builder addım-addım işləyir:

| Addım | Əməliyyat | Nəticə |
| --- | --- | --- |
| 1 | “StartTag p” → yeni `ElementNode(p)` yarat | `currentNode = p` |
| 2 | “Character Salam” → `TextNode("Salam")` yarat və `p`-nin uşağı et | `p.children = [text]` |
| 3 | “EndTag p” → `currentNode` bağlanır, yuxarı səviyyəyə qayıdır | `p` DOM-a əlavə olunur |

## Node-ların əlaqəsi: Parent, Child, Sibling

Hər bir node-un üç əsas əlaqəsi var:

- `parentNode`
- `firstChild` / `lastChild`
- `previousSibling` / `nextSibling`

## Implicit node-lar (avtomatik əlavə olunanlar)

Parser bəzi node-ları **öz-özünə yaradır.**

Məsələn, sən aşağıdakı HTML-i yazsan:

`<title>Test</title>
<p>Salam</p>`
Brauzer ağacı belə quracaq:

```
Document
└── html (avtomatik)
    ├── head (avtomatik)
    │   └── title("Test")
    └── body (avtomatik)
        └── p("Salam")
```

Bu, HTML-in tolerant parsing qaydalarına əsaslanır.

## Script və Blocking davranışı

Parser `<script>` tagına çatdıqda xüsusi davranış göstərir:

1. HTML parsing **dayanır**.
2. Script yüklənir və icra olunur.
3. Əgər script DOM-u dəyişərsə (məsələn `document.write()`), parser ağacı **yenidən qurur**.
4. Sonra parsing davam edir.

Bu səbəbdən `<script>` tag-ları səhifənin ortasında çoxdursa, render yavaşlayır.

### Performans üçün:

- `defer` → script paralel yüklənir, amma DOM hazır olanda icra olunur.
- `async` → script paralel yüklənir və gəldiyi anda icra olunur.

## Node yaradılmasının yaddaş səviyyəsində baş verməsi

Daxildə, hər node **heap yaddaşında** bir obyekt kimi yaradılır.

Sadələşmiş model:

```jsx
ElementNode {
  tagName: "p",
  attributes: { class: "intro" },
  children: [
    TextNode("Salam Dünya")
  ],
  parent: <body>
}

```

Bu obyektlər “linked structure” formasında saxlanılır.

## TreeBuilder və Reflow əlaqəsi

Əgər sən JavaScript ilə DOM-u dəyişirsənsə (məsələn `appendChild` və ya `innerHTML` ilə),

brauzer **TreeBuilder**-in həmin hissəsini yenidən işə salır və DOM yenidən təşkil olunur.

Bu da “Reflow” və “Repaint” əməliyyatlarını doğurur.

Ona görə DOM dəyişiklikləri birləşdirilərək (`documentFragment`, `requestAnimationFrame`) edilməlidir.

### **Real-world Debug**

Chrome DevTools-da **Network → Response** bölməsində sənə gələn HTML-i görə bilərsən.

Oradakı HTML “xam textdir”.

Sonra “Elements” tabında **DOM ağacını** görürsən — bu artıq **parser nəticəsidir**.

İkisini müqayisə et → brauzerin hansı tag-ları “özündən əlavə etdiyini” görəcəksən.

## 🎨 Addım 4: CSSOM və Render Tree

HTML bitti? Yox hələ.

CSS faylları da eyni şəkildə oxunur və **CSSOM (CSS Object Model)** qurulur.

Daha sonra DOM + CSSOM birləşərək **Render Tree** əmələ gətirir.

Render Tree-də yalnız görünən elementlər olur (məsələn, `display: none` olanlar daxil deyil).

> 💡 Dərin texniki detal:
> 
> 
> Render Tree yaranmadan brauzer **paint** edə bilmir.
> 
> Buna görə “render-blocking CSS” anlayışı var — HTML gəlir, amma brauzer ekrana heç nə çəkmir, çünki CSS hələ hazır deyil.
> 

## 🧮 Addım 5: Layout, Paint, Composite

Render Tree hazır olanda brauzer bu mərhələlərdən keçir:

1. **Layout (Reflow)** – Hər elementin ölçüsü və mövqeyi hesablanır.
2. **Paint** – Piksel səviyyəsində rənglər, kölgələr, fontlar çəkilir.
3. **Composite** – Layer-lər GPU səviyyəsində birləşdirilir və ekrana çıxır.

Bu mərhələlər Chrome DevTools-da “Performance” tabında izlənilə bilər.

## Error Recovery və Real Dünya

HTML5 parser-lər çox tolerantdır, çünki internetdəki səhv HTML-lərin 90%-i işləməlidir.

Bu səbəbdən:

- **Tag mismatches** bərpa olunur,
- **Bağlanmayan elementlər** avtomatik tamamlanır,
- **Doctype səhvləri** “quirks mode” aktivləşdirir.

> 💡 “Quirks Mode” — Köhnə brauzerlərlə uyğunluq üçün fərqli layout hesablamaları aparılır.

