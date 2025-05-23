// pages/[locale]/dashboard.jsx
import { useRouter } from 'next/router';
import en from '../../locales/en.json';
import es from '../../locales/es.json';

export default function Dashboard() {
  const { locale } = useRouter();
  const t = locale === 'es' ? es : en;
  return <h1>{t.dashboard.title}</h1>;
}

export function getStaticPaths() {
  return { paths: [{ params: { locale: 'en' } }, { params: { locale: 'es' } }], fallback: false };
}

export function getStaticProps({ params }) {
  return { props: { locale: params.locale } };
}