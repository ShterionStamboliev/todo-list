import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from './components/Navigation/Navigation'
import styles from './page.module.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './provider/AuthProvider';
import Footer from './components/Navigation/Footer';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Listify',
	description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={styles.html}>
			<body
				className={inter.className}
				style={{
					margin: '0',
					padding: '0',
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
					height: '100%'
				}}>
				<AuthProvider>
					<Navigation />
					{children}
					<ToastContainer />
				</AuthProvider>
				<Footer />
			</body>
		</html>
	)
}
