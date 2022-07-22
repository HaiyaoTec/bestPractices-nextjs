import {useRouter} from 'next/router'
import fetchJson from "@/lib/fetch/fetchJson";
import Link from 'next/link'
import {useTranslation} from "next-i18next";
import {observer} from "mobx-react-lite";
import useStore from "@/store/index";
import {User} from "@/lib/example/Dto";

function Header() {
  const {useUserStore:user} = useStore()
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
          {!user?.userInfo.isLoggedIn && (
            <li>
              <Link href="/login">
                <a>{t('登录')}</a>
              </Link>
            </li>
          )}
          {!!user?.userInfo.isLoggedIn && (
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
                    user.updateUserInfo(
                      await fetchJson<User>('/api/user/logout', {method: 'POST'})
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
export default Header
