declare module 'locomotive-scroll' {
  interface LocomotiveScrollOptions {
    el?: Element | string
    name?: string
    offset?: number | [number, number]
    repeat?: boolean
    smooth?: boolean | number
    multiplier?: number
    firefoxMultiplier?: number
    touchMultiplier?: number
    scrollFromAnywhere?: boolean
    gestureOrientation?: 'vertical' | 'horizontal' | 'both'
    normalizeWheel?: boolean
    smartphone?: {
      smooth?: boolean
      direction?: 'vertical' | 'horizontal' | 'both'
      gestureOrientation?: 'vertical' | 'horizontal' | 'both'
      breakpoint?: number
    }
    tablet?: {
      smooth?: boolean
      direction?: 'vertical' | 'horizontal' | 'both'
      gestureOrientation?: 'vertical' | 'horizontal' | 'both'
      breakpoint?: number
    }
    scrollbarContainer?: Element | string
    scrollbarContainerClass?: string
    scrollbarClass?: string
    content?: Element | string
    wrapper?: Element | string
    lerp?: number
    class?: string
    scrollbar?: boolean
    direction?: 'vertical' | 'horizontal' | 'both'
    reloadOnContextChange?: boolean
    resetNativeScroll?: boolean
    native?: boolean
    getDirection?: boolean
    getSpeed?: boolean
    getScroll?: boolean
    init?: () => void
    destroy?: () => void
    start?: () => void
    stop?: () => void
    scrollTo?: (target: Element | string | number, options?: any) => void
    setScroll?: (x: number, y: number) => void
    update?: () => void
    on?: (event: string, callback: Function) => void
    off?: (event: string, callback: Function) => void
    updateScroll?: (instance: LocomotiveScroll, event: any) => void
  }

  class LocomotiveScroll {
    constructor(options?: LocomotiveScrollOptions)
    init(): void
    destroy(): void
    start(): void
    stop(): void
    scrollTo(target: Element | string | number, options?: any): void
    setScroll(x: number, y: number): void
    update(): void
    on(event: string, callback: Function): void
    off(event: string, callback: Function): void
    updateScroll(instance: LocomotiveScroll, event: any): void
  }

  export = LocomotiveScroll
}