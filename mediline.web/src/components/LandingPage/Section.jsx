{/* This is the component for the sections that divide each part of the landing page.
   Each section consists of a section header and section content.
   You can give each section a unique ID to allow you to change the styles for components in a specific section */}
export default function Section({
        id,
        header,
        content,
        customClass = ''
    }) {

    return (
        <section id={id} className={`sectionContainer ${customClass}`}>
            {header ? (
                <div className="sectionHeader">
                    {header}
                </div>
            ) : (
                    <div className="sectionHeader" style={{ height: '0', overflow: 'hidden' }}></div>
            )}
            <div className="sectionContent">
                {content}
            </div>
        </section>
    );
}