import Logo from '../components/Logo';
import Menu from '../components/Menu';

const Header = () => (
  <div className="header">
    <Logo />
    <Menu />

    <style jsx>{`
      .header {
        padding: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      @media (max-width: 600px) {
        .header-wrapper {
          display: block;
          text-align: center;
        }
      }
    `}</style>
  </div>
);

export default Header;