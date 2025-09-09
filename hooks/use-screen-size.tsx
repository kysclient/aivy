import * as React from 'react'

const MOBILE_BREAKPOINT = 800
const TABLET_BREAKPOINT = 1300

export function useScreenSize() {
  const [screenSize, setScreenSize] = React.useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  })

  React.useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth
      setScreenSize({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT
      })
    }

    updateScreenSize() 

    const mqlMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const mqlTablet = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px) and (max-width: ${TABLET_BREAKPOINT - 1}px)`)
    const mqlDesktop = window.matchMedia(`(min-width: ${TABLET_BREAKPOINT}px)`)

    const onChange = () => {
      updateScreenSize()
    }

    mqlMobile.addEventListener('change', onChange)
    mqlTablet.addEventListener('change', onChange)
    mqlDesktop.addEventListener('change', onChange)

    return () => {
      mqlMobile.removeEventListener('change', onChange)
      mqlTablet.removeEventListener('change', onChange)
      mqlDesktop.removeEventListener('change', onChange)
    }
  }, [])

  return screenSize
}
