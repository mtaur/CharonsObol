
const routes = [
  {
    path: '/battle2',
    component: () => import('layouts/BattleLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Battle2.vue'), name: 'battle2' }
    ],
    meta: {
      title: `Charon's Obol`
    }
  },
  {
    path: '/battle',
    component: () => import('layouts/BattleLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Battle.vue') }
    ],
    meta: {
      title: `Charon's Obol`
    }
  },
  {
    path: '/sandbox',
    component: () => import('layouts/NewPartyLayout.vue'),
    children: [
      { path: 'early', component: () => import('pages/SandboxEarly.vue') },
      { path: 'mid', component: () => import('pages/SandboxMid.vue') },
      { path: 'late', component: () => import('pages/SandboxLate.vue') },
      { path: 'ratslimeboss', component: () => import('pages/RatslimeBoss.vue') },
      { path: 'sandboxcerberus', component: () => import('pages/SandboxCerberus.vue') }
    ],
    meta: {
      title: `Charon's Obol`
    }
  },
  {
    path: '/campaign/start',
    component: () => import('layouts/NewPartyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CampaignStart') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/NewPartyLayout.vue'),
    children: [
      // { path: '', component: () => import('pages/Index.vue') }
      { path: '', component: () => import('pages/Sandbox-proto-15.vue') }
    ],
    meta: {
      title: `Charon's Obol`
    }
  }
  // {
  //   path: '/',
  //   component: () => import('layouts/BattleLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') },
  //     { path: 'battle', component: () => import('pages/Battle.vue') }
  //   ],
  //   meta: {
  //     title: `Charon's Obol`
  //   }
  // }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
