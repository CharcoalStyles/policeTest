import { ApplicationInsights } from '@microsoft/applicationinsights-web'

export default ({ $config }, inject) => {
  if ($config.AI_CONNECTION_STRING === undefined) {
    console.warn('azure insights disabled, using old static data')
    console.warn('This should only be used for development')
    inject('azureInsights', {
      trackEvent: ({ name, ...rest }) => console.log('trackEvent', name, rest),
      trackPageView: ({ name }) => console.log('trackPageView', name),
      trackPageViewPerformance: ({ name }) => console.log('trackPageViewPerformance', name),
      trackException: () => console.log('trackException'),
      trackTrace: () => console.log('trackTrace'),
      trackMetric: ({ name }) => console.log('trackMetric', name),
      trackDependencyData: () => console.log('trackDependencyData'),
      startTrackPage: (tag) => console.log('startTrackPage', tag),
      stopTrackPage: (tag) => console.log('stopTrackPage', tag),
      startTrackEvent: (tag) => console.log('startTrackEvent', tag),
      stopTrackEvent: (tag) => console.log('stopTrackEvent', tag),
      flush: () => console.log('flush')
    })
    return
  }

  const appInsights = new ApplicationInsights({
    config: {
      connectionString: $config.AI_CONNECTION_STRING,
      enableAutoRouteTracking: true
    }
  })
  appInsights.loadAppInsights()
  appInsights.trackPageView()

  inject('azureInsights', appInsights)
}
