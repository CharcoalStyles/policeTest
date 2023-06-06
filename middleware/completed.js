export default function ({ redirect, store, error }) {
  if (!store.state.pathway.completed) {
    error({
      statusCode: 500,
      title: 'Incomplete answer data',
      message: 'The form data required to display this page appears to be incomplete. If you previously completed all pathway questions the data stored in your browser may have expired.',
      link: {
        title: 'Return to Pathway Questions',
        to: '/pathway/start'
      }
    })
  }
}
