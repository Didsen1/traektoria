import { useState, type FC } from "react";
import type { Cards } from "../model/types/Cards";
import styles from './Card.module.scss'


export const Card: FC<Cards> = ({ id, color, name, model, price, year, onDelete, onUpdate }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editingName, setEditingName] = useState(name);
    const [editingModel, setEditingModel] = useState(model);
    const [editingPrice, setEditingPrice] = useState(price);

    const handleDelete = () => {
        onDelete(id)
    }

    const handleUpdate = () => {
        onUpdate(id, { name: editingName, model: editingModel, price: editingPrice })
        setIsEditing(false);
    }

    return (
        <div className={styles.Card}>
            <div className={styles.TitleWrapper}>
                {isEditing ? <input value={editingName} onChange={(e) => setEditingName(e.target.value)} ></input> : <p className={styles.CardTitle}>{name}</p>}
                {isEditing ? <input value={editingModel} onChange={(e) => setEditingModel(e.target.value)}></input> : <p className={styles.CardSubTitle}>{model}</p>}
            </div>
            <div className={styles.DescriptionWrapper}>
                <p>Цвет: {color}</p>
                <p>Год выпуска: {year}</p>
            </div>
            <div className={styles.PriceWrapper}>
                {isEditing ? <input value={editingPrice} type="number" onChange={(e) => setEditingPrice(e.target.value)}></input> : <p>Цена: {price}</p>}
            </div>
            <div className={styles.ButtonWrapper}>
                {isEditing ?
                    <button type="button" onClick={handleUpdate} className={styles.button}>Сохранить</button>
                    :
                    <>
                        <button type="button" onClick={() => setIsEditing(true)} className={styles.button}>Редактировать</button>
                        <button type="button" onClick={handleDelete} className={styles.button}>Удалить</button>
                    </>
                }
            </div>
        </div>
    );
}