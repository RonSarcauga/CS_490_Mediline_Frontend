import { useState } from 'react';

{/* This is the base component for an accordion. */ }
export default function Accordion({
    customClass = "",
    headerClass = "", 
    data=[]
})
{
    const [selected, setSelected] = useState(null);

    const toggle = (i) => {
        if (selected == i) {
            return setSelected(null);
        }

        setSelected(i);
    };

    return (
        <div className="accordion">
            {data.map((item, i) => (
                <div className={`accordionItem ${customClass}`} key={i}>
                    <div className={`accordionTitle ${headerClass}`} onClick={() => toggle(i)}>
                        {item.header}
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
                        {item.content}
                    </div>
                </div>
            ))}
        </div>
    );
}
