import {useRouter} from 'next/router'
import useUser from '@/lib/authentication/useUser'
import fetchJson from "@/lib/fetch/fetchJson";
import Link from 'next/link'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

export default function Header() {
  const {user, mutateUser} = useUser()
  const router = useRouter()
  const {t} = useTranslation('common')
  return (
    <header>
      <nav>
        <ul>
          <li className={'ml-4'}>
            <Link locale={router.locale === 'zh' ? 'en' : 'zh'} href="">
              <a>{router.locale === 'zh' ? 'English' : '中文'}</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>{t('首页')}</a>
            </Link>
          </li>
          {user?.isLoggedIn === false && (
            <li>
              <Link href="/login">
                <a>{t('登录')}</a>
              </Link>
            </li>
          )}
          {user?.isLoggedIn === true && (
            <>
              <li>
                <Link href="/account">
                  <a>{t('账户')}</a>
                </Link>
              </li>
              <li>
                <Link
                  href=''
                >
                  <a onClick={async (e) => {
                    e.preventDefault()
                    mutateUser(
                      await fetchJson('/api/user/logout', {method: 'POST'}),
                      false
                    )
                    router.push('/login')
                  }}> {t('登出')}</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        li {
          margin-right: 1rem;
          display: flex;
        }

        li:nth-child(2) {
          margin-left: auto;
        }

        a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        a img {
          margin-right: 1em;
        }

        header {
          padding: 0.2rem;
          color: #fff;
          background-color: #1ab781;
        }
      `}</style>
    </header>
  )
}
