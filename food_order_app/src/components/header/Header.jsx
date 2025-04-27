
import ModalComponent from '../modal/Modal';
import styles from './header.module.css';

const Header = () => {
    return (
        
        <header className={styles.header}>
            <div className={styles.logo}>
                <img src="food.png" alt="logo" />
            </div>
            <div className={styles.cartIcon} >
                <ModalComponent/>
            </div>
        </header>
    )
}

export default Header