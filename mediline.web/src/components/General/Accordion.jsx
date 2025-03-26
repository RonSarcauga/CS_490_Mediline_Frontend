import { useState } from 'react';

{/* This is the base component for an accordion. */ }
export default function Accordion() {
    const [selected, setSelected] = useState(null)

    const toggle = (i) => {
        if (selected == i) {
            return setSelected(null)
        }

        setSelected(i)
    }

    const data = [
        {
            header: 'Header 1',
            content: 'Content 1'
        },
        {
            header: 'Header 2',
            content: 'Content 2'
        },
        {
            header: 'Header 3',
            content: 'Content 3'
        }
    ]

    return (
        <div className="accordion">
            {data.map((item, i) => (
                <div className="accordionItem">
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
