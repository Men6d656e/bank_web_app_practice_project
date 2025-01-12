import HeaderBox from '@/components/ui/HeaderBox'
import TotalBalanceBox from '@/components/ui/TotalBalanceBox';

const Home = () => {
    const logedIn = { firstName : "Akash"};
    return (
        <section className='home'>
            <div className='home-content'>
                <header className='home-header'>
                    <HeaderBox
                    type="greeting"
                    title="Hello"
                    user={logedIn?.firstName || "Guest"}
                    subtext="Access and manage your accounts and transactions efficiently."
                    />

                    <TotalBalanceBox
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance={1250.35}
                    />

                </header>
            </div>
        </section>
    )
}

export default Home