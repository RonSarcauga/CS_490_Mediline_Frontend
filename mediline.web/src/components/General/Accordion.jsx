import { useState } from 'react';

{/* This is the base component for an accordion. */ }
export default function Accordion({ data = [] }) {
    const [selected, setSelected] = useState(null)

    const toggle = (i) => {
        if (selected == i) {
            return setSelected(null)
        }

        setSelected(i)
    }

    return (
        <div className="accordion">
            {data.map((item, i) => (
                <div className="accordionItem" key={i}>
                    <div className='accordionTitle' onClick={() => toggle(i)}>
                        <h3>{item.header}</h3>
                        <span>
                            {selected === i
                                ?
                                <div className="dropdownDown"></div>
                                :
                                <div className="dropdownUp"></div>
                            }
                            <div className="dropdownIcon"></div>
                        </span>
                    </div>
                    <div
                        className={
                            selected === i
                                ?
                                'accordionContent show'
                                :
                                'accordionContent'
                        }>
                        <p>{item.content}</p>
                    </div>
                </div>
            ))}
            </div>
    );
}
