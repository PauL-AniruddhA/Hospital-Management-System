import React from 'react'
import "../../styles/Components/ui/Sidebar.css";
function Sidebar({entity="default", }) {
  return (
    <>
      <section className="sidebar" data-entity={entity}>
        <div className="sidebar__nav-items">
          <nav className="doctor-sidebar">
            {NAV_SECTIONS.map((section, index) => (
              <div key={section.title} className={`sidebar-section sidebar-section--${section.theme}`} >
                {/* SECTION TITLE */}
                    

                {/* <div className="sidebar-section__header">
                  <div className="sidebar-section__line"/>
                  <div className="sidebar-section__dot" />
                  <span>{section.title}</span>
                  <div className="sidebar-section__line" />
                </div> */}

                {/* ITEMS */}

                <div className="sidebar-section__body">
                  
                  {section.items.map(
                    ({ id, label, icon: Icon, count, tag }) => (
                      <button key={id} type="button" onClick={() => setActiveTab(id)}  className={ "sidebar-item" + (activeTab === id ? " sidebar-item--active" : "")}>
                        <div className="sidebar-item__icon">
                          <Icon size={18} strokeWidth={2} />
                        </div>
                        <span className="sidebar-item__label">
                          {label}
                        </span>
                        {count && (
                          <span className="sidebar-item__badge">
                            {count}
                          </span>
                        )}
                        {tag && (
                          <span className="sidebar-item__tag">
                            {tag}
                          </span>
                        )}
                      </button>
                    )
                  )}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="sidebar__bottom">    
          <button type="button" className="sidebar__help"  onClick={() => setHelpOpen(true)}>
            <span className="sidebar__help-icon">
              <Headset size={18} strokeWidth={2} />
            </span>
            <div className="sidebar__help-text" >
              <span className="sidebar__help-title">Need Help?</span>
              <span className="sidebar__help-subtitle">Contact IT Support</span>
            </div>
          </button>

          {helpOpen && createPortal(
            <div className="help-modal-overlay" onClick={() => setHelpOpen(false)}>
              <div className="help-modal" onClick={(e) => e.stopPropagation()}>
                
                <div className="help-modal__header">
                  <div className="help-modal__title-group">
                    <span className="help-modal__icon">
                      <Headset size={18} strokeWidth={2} />
                    </span>
                    <span className="help-modal__title">IT Support</span>
                  </div>
                  <button type="button" className="help-modal__close"
                    aria-label="Close" onClick={() => { setHelpOpen(false); setTicketId(null); }} >
                    <X size={16} />
                  </button>
                </div>

                {ticketId ? (
                  /* ---------- confirmation state ---------- */
                  <div className="help-modal__confirm">
                    <span className="help-modal__confirm-icon">
                      <CheckCircle2 size={32} strokeWidth={2} />
                    </span>
                    <p className="help-modal__confirm-title">Ticket Raised</p>
                    <p className="help-modal__confirm-id">#{ticketId}</p>
                    <p className="help-modal__confirm-text">
                      Your request has been added to the support queue.
                      The team will get back to you shortly.
                    </p>
                    <button type="button" className="help-modal__submit-btn" onClick={() => { setHelpOpen(false); setTicketId(null); }} >
                      Done
                    </button>
                  </div>
                ) : (
                  /* ---------- form state ---------- */
                  <>
                    <a href="tel:18000000000" className="help-modal__quick-item help-modal__quick-item--solo">
                      <Phone size={15} strokeWidth={2} />
                      <span>Urgent? Call 1800-000-0000</span>
                    </a>

                    <p className="help-modal__subtitle">Or raise a ticket with the support team.</p>

                    <div className="help-modal__form">
                      <div className="help-modal__field">
                        <label htmlFor="help-subject">Subject</label>
                        <input id="help-subject" type="text" placeholder="Login issue on patient records" value={helpSubject} onChange={(e) => setHelpSubject(e.target.value)} />
                      </div>

                      <div className="help-modal__field">
                        <label htmlFor="help-priority">Priority</label>
                        <div className="help-modal__priority-group" id="help-priority">
                          {["Low", "Medium", "Urgent"].map((p) => (
                            <button
                              key={p}
                              type="button"
                              className={
                                "help-modal__priority-btn" +
                                (helpPriority === p ? ` help-modal__priority-btn--active-${p.toLowerCase()}` : "")
                              }
                              onClick={() => setHelpPriority(p)}
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="help-modal__field">
                        <label htmlFor="help-message">Message</label>
                        <textarea id="help-message" placeholder="Describe the issue" rows={3} value={helpMessage} onChange={(e) => setHelpMessage(e.target.value)} />
                      </div>
                    </div>

                    <button
                      type="button"
                      className="help-modal__submit-btn"
                      disabled={!helpSubject.trim() || !helpMessage.trim()}
                      onClick={() => {
                        const id = `IT-${Math.floor(1000 + Math.random() * 9000)}`;
                        setTicketId(id);
                        setHelpSubject("");
                        setHelpMessage("");
                        setHelpPriority("Medium");
                      }}
                    >
                      Raise Ticket
                    </button>
                  </>
                )}
              </div>
            </div>,
            document.body
          )}

          <div className="sidebar__footer">
            <p>© 2025 AMS Hospital</p>
            <p>All rights reserved.</p>
          </div>
        </div>

      </section>
    </>
  )
}

export default Sidebar
