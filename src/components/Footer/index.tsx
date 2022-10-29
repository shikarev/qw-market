import { ReactComponent as Logo } from '../../assets/Icons/logo_full.svg?svgr';
import { FacebookIcon, TwitterIcon } from '../svgComponents/Icons/social';
import { ReactComponent as InstagramIcon } from '../../assets/Icons/instagram.svg?svgr';
import { ReactComponent as GetGoogle } from '../../assets/Icons/google_play_badge.svg?svgr';
import { ReactComponent as GetApple } from '../../assets/Icons/app_store_badge.svg?svgr';
import phone from '../../assets/footer/phone.png';
import { Box, Container, Fab, Grid, Link, styled, Typography } from '@mui/material';

const FooterFab = styled(Fab)(() => ({
  boxShadow: 'none',
  backgroundColor: 'transparent',
  width: '4.8rem',
  height: '4.8rem'
}))

const Hr = styled(Box)(({ theme }) => ({
  border: 'none',
  borderBottom: `solid 1px ${theme.palette.secondary.main}`
}))

const columns = [
  {
    title: 'Как купить',
    items: [
      {
        title: 'Оплата и доставка'
      },
      {
        title: 'Возврат'
      },
      {
        title: 'Справка'
      }
    ]
  },
  {
    title: 'Партнерам',
    items: [
      {
        title: 'Как начать продавать'
      },
      {
        title: 'Справка для партнеров'
      },
      {
        title: 'Партнёрская программа'
      },
      {
        title: 'Админ панель для вашего магазина',
        link: '/admin'
      }
    ]
  },
  {
    title: 'Контакты',
    items: [
      {
        title: 'Новости компании'
      },
      {
        title: 'О сервисе'
      },
      {
        title: 'Пользовательское соглашение'
      },
    ]
  },
  {
    title: 'Контакты',
    items: [
      {
        title: 'Обратная связь'
      },
      {
        title: 'Почта'
      },
      {
        title: 'Телефон'
      },
    ]
  },
]


const QFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  paddingTop: '5rem',
  paddingBottom: '2.5rem',
  marginTop: 'auto'
}))

const Footer = () => {
  return (
    <QFooter>
      <Container
        maxWidth="xl"
        sx={{
          m: '0 auto',
          p: { xl: '0 10rem', lg: '0 4.8rem', md: '0 2.4rem', sm: '0 2rem', xs: '0 1.6rem' },
        }}
        disableGutters
      >
        <Grid container spacing={3} alignItems={'flex-end'}>
          <Grid item xs={12} md={5}>
            <Logo />
            <Box sx={{
              mt: '4rem',
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' }
            }}>
              <Typography sx={{ fontSize: { xs: '2rem', md: '3.2rem' }, fontWeight: 700 }}>
                Скачайте приложение в <span style={{whiteSpace: 'nowrap'}}>App Store</span> или <span style={{whiteSpace: 'nowrap'}}>Google Play</span>
              </Typography>
              <Box sx={{ mt: 6, mb: 10, display: 'flex', flexWrap: 'nowrap' }}>
                <StoresLinks />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={4} sx={{ height: '276px', display: 'flex', justifyContent: 'flex-end' }}>
            <img src={phone} alt="phone" />
          </Grid>
          <Grid item sx={{ mt: '10rem' }} alignSelf={'flex-start'} xs={6} md={3}>
            <Typography>Получите скидку 10% за регистрацию и первый заказ в приложении</Typography>
          </Grid>
        </Grid>

        <Hr />
        <Grid container spacing={10} sx={{ mt: 1 }}>
          {
            columns.map((col, colIndex) => (
              <Grid item xs={12} sm={6} md={3} key={colIndex}
                    sx={{ '& a:not(first-of-type) > p': { mt: 3 } }}>
                {
                  col.title && <Typography sx={{ mb: '3rem', fontWeight: 600, fontSize: '1.6rem' }}>
                    {col.title}
                  </Typography>
                }
                {col.items.map((item, colItemIndex) => (
                  <Link underline="none" href={item.link ?? '/#'} key={colItemIndex}>
                    <Typography sx={{ fontWeight: 500, fontSize: '1.4rem', color: 'text.primary' }}>
                      {item.title}
                    </Typography>
                  </Link>
                ))}
              </Grid>
            ))
          }
        </Grid>

        <Box sx={{ display: 'flex', alignItems: 'center', mt: '2rem', flexWrap: 'wrap' }}>
          <Typography sx={{ color: 'text.secondary', mr: 'auto' }}>
            © ООО «Назарет Капитал», {new Date().getFullYear()}
          </Typography>
          {/*<Box sx={{ display: 'flex', 'svg': { color: 'text.secondary' }, ml: 'auto' }}>
            <SocialLinks />
          </Box>*/}
        </Box>
      </Container>
    </QFooter>
  )
};

const StoresLinks = () => (
  <>
    <Link href="https://play.google.com/">
      <GetGoogle />
    </Link>
    <Link href="https://www.apple.com/app-store/" sx={{ ml: '1.2rem' }}>
      <GetApple />
    </Link>
  </>
)

const SocialLinks = () => (
  <>
    <a href="https://twitter.com/nazaret_capital/">
      <FooterFab><TwitterIcon /></FooterFab>
    </a>
    <a href="https://twitter.com/nazaret_capital/">
      <FooterFab><InstagramIcon /></FooterFab>
    </a>
    <a href="https://www.facebook.com/Nazaret-Capital-103037578691548">
      <FooterFab><FacebookIcon /></FooterFab>
    </a>
  </>
)

export default Footer;
