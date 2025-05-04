"use client"

import type * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full">{children}</div>
}

const Chart = ({ children }: { children: React.ReactNode }) => {
  return <div className="relative">{children}</div>
}

const ChartTooltip = ({ children }: { children: React.ReactNode }) => {
  return (
    <TooltipProvider delayDuration={50}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white">{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

const ChartTooltipContent = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}

const ChartLegend = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-wrap gap-2">{children}</div>
}

const ChartLegendItem = ({ name, className }: { name: string; className?: string }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
      {name}
    </div>
  )
}

const ChartPie = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full h-full">{children}</div>
}

const ChartPieSeries = ({
  data,
  category,
  value,
  children,
  paddingAngle,
  cornerRadius,
}: {
  data: any[]
  category: string
  value: string
  children: React.ReactNode
  paddingAngle?: number
  cornerRadius?: number
}) => {
  return <div>{children}</div>
}

const ChartPieValueLabel = ({
  className,
  fontSize,
}: {
  className?: string
  fontSize?: number
}) => {
  return <div className={className} style={{ fontSize: fontSize }}></div>
}

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendItem,
  ChartPie,
  ChartPieSeries,
  ChartPieValueLabel,
}
