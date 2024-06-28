import { ApplicationInsights } from '@microsoft/applicationinsights-web'

export default ({ $config }, inject) => {
  if ($config.AI_CONNECTION_STRING === undefined) {
    console.warn('azure insights disabled, using old static data')
    console.warn('This should only be used for development')
    inject('appInsights', {})
    return
  }

  const appInsights = new ApplicationInsights({
    config: {
      connectionString: $config.AI_CONNECTION_STRING
    }
  })
  inject('appInsights', appInsights)
}
