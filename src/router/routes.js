
const routes = [
  {
    path: '/',
    component: () => import('layouts/BattleLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'battle', component: () => import('pages/Battle.vue') }
    ],
    meta: {
      title: `Charon's Obol`
    }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
