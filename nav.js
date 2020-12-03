const data = [
    {
        icon: 'mdi-video',
        title: 'Стримы',
        permission: ['STREAM_MASTER', 'ADMIN', 'MANAGER'],
        child: [
            {
                title: 'Стримы звезд',
                to: '/streams/stars',
            },
            {
                title: 'Стримы брендов',
                to: '/streams/brands',
            },
            {
                title: 'Звезды',
                to: '/streams/star-streamers',
            },
            {
                title: 'Бренды',
                to: '/streams/brand-streamers',
            },
            {
                title: 'Каналы стримов',
                to: '/streams/categories',
            },
            {
                title: 'Эфир',
                to: '/streams/ether',
                mark: 'red',
                permission: ['STREAM_MASTER', 'ADMIN']
            },
            {
                title: 'Сгенерировать ссылку',
                to: '/streams/link',
                mark: '#0083bf'
            },
        ]
    },
    {
        icon: 'mdi-cart',
        title: 'Товары',
        permission: ['ADMIN', 'MANAGER'],
        child: [
            {
                title: 'Список товаров',
                to: '/goods',
            },
            {
                title: 'Список товбанов',
                to: '/goods/tovban',
            },
            {
                title: 'Импорт / фиды',
                to: '/goods/import',
            }
        ]
    },
    {
        icon: 'mdi-party-popper',
        title: 'Концерты',
        permission: ['ADMIN', 'MANAGER'],
        child: [
            {
                title: 'Концерты',
                to: '/concerts',
            },
            {
                title: 'Артисты',
                to: '/concerts/artists',
            },
        ]
    },
    {
        icon: 'mdi-puzzle',
        title: 'Партнеры',
        permission: ['ADMIN', 'MANAGER'],
        child: [
            {
                title: 'Список партнеров',
                to: '/partners',
            },
            {
                title: 'Информационные партнеры',
                to: '/info-partners',
            },
            {
                title: 'Локальные партнеры',
                to: '/local-partners',
            },
        ]
    },
    {
        icon: 'mdi-image-album',
        title: 'Банеры',
        permission: ['ADMIN', 'MANAGER'],
        child: [
            {
                title: 'Сквозные банеры',
                to: '/banners',
            }
        ]
    },
    {
        icon: 'mdi-widgets',
        title: 'Виджеты',
        permission: ['ADMIN', 'MANAGER'],
        child: [
            {
                title: 'Импорт ленты',
                to: '/widgets/import',
            },
            {
              title: 'Импорт главной',
              to: '/widgets/import-main',
            }
        ]
    },
    {
        icon: 'mdi-format-list-bulleted-square',
        title: 'Сторис',
        permission: ['ADMIN', 'MANAGER'],
        child: [
            {
                title: 'Список историй',
                to: '/faq',
            }
        ]
    },
    {
      icon: 'mdi-account-multiple-outline',
      title: 'Лиды',
      permission: ['ADMIN'],
      child: [
        {
          title: 'Список лидов',
          to: '/leads',
        },
      ]
    },
    {
        icon: 'mdi-account-group',
        title: 'Пользователи',
        permission: ['ADMIN'],
        child: [
            {
                title: 'Список покупателей',
                to: '/users',
            },
            {
                title: 'Список менеджеров',
                to: '/users/managers',
            },
            {
                title: 'Список ведущих',
                to: '/users/leadings',
            }
        ]
    },
    {
        icon: 'mdi-cog-outline',
        title: 'Профиль',
        to: '/profile',
        permission: ['STREAM_MASTER', 'ADMIN', 'MANAGER'],
        child: [
            {
                title: 'Профиль',
                to: '/profile',
            }
        ]
    }
]

const getNavByRole = (role) => {
    return data.map(item => {
        if(item.permission && item.permission.indexOf(role) === -1) return false

        let newItem = JSON.parse(JSON.stringify(item))
        newItem.child = newItem.child.filter(child => !child.permission || child.permission.indexOf(role) !== -1)
        return newItem
    }).filter(item => item)
}
export { getNavByRole }
