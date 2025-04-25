import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { BsCart4 } from "react-icons/bs";
import { useCartHook } from '../../hooks/useCartHook';
import styles from './modal.module.css';

const ModalComponent = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { state ,dispatch} = useCartHook();

    const showModal = () => {
    setIsModalOpen(true);
    };


    const handleCancel = () => {
    setIsModalOpen(false);
    };

    return (
        <>
            
    <button onClick={showModal}>
                <BsCart4 size={'2rem'} />
                <span style={{fontSize:'1.2rem'}}>({state.items.length})</span>
    </button>
            
            <Modal footer={<Button onClick={handleCancel}>Close</Button>} title="Your Cart" open={isModalOpen} onCancel={handleCancel}>
                <div style={{ height: '50vh', overflowY: 'auto' }}>
                    {state.items.map((item) =>
                    {
                        const { meal, quantity } = item;
                        return (
                <div className={styles.itemWrapper} >
                        <div className={styles.itemInfo}>
                        <div className={styles.shoppingCartItemImg}>
                        <img src={meal.image} alt="" />
                        </div>
                        <div>
                        <div style={{display:'flex',gap:'0.5rem',alignItems:"center"}}>
                                            <h4>{meal.name}</h4>
                            <span>{quantity}</span>
                                            
                            <div style={{display:'flex',flexDirection:'column',gap:'0.5rem'}}>
                            <button>
                                + 
                            </button>
                            <button>
                                -
                            </button>
                            </div>
                    </div>
                        <p>{meal.price} $</p>
                        </div>
                        </div>
                        <div>
                            <button className='removeBtn' onClick={()=> dispatch({ type: 'removeItem', payload: meal.id })}>Remove</button>
                        </div>
                </div>
                    )}
                )}
                </div>
            

    </Modal>
        </>
        
    );
}

export default ModalComponent;