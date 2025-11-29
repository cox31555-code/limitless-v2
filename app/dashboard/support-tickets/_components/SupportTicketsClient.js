"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./supportTicketsClient.module.css";

const SupportTicketsClient = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Mock data - will be replaced with Jira Service Management API later
  const allTickets = [
    {
      id: "535664",
      subject: "React native gesture handler error",
      status: "Open",
      submissionDate: "11/25/2024",
      priority: "High",
    },
    {
      id: "546467",
      subject: "Access group not working properly",
      status: "In progress",
      submissionDate: "11/24/2024",
      priority: "Medium",
    },
    {
      id: "754322",
      subject: "SSO login not working",
      status: "Closed",
      submissionDate: "11/12/2024",
      priority: "Low",
    },
    {
      id: "820599",
      subject: "Tokenization bundle failing",
      status: "In progress",
      submissionDate: "10/25/2024",
      priority: "High",
    },
    {
      id: "195568",
      subject: "Bundle data not loading",
      status: "Open",
      submissionDate: "10/18/2024",
      priority: "High",
    },
    {
      id: "939694",
      subject: "User groups not displaying",
      status: "In progress",
      submissionDate: "10/12/2024",
      priority: "Low",
    },
    {
      id: "295606",
      subject: "Test app not working",
      status: "Closed",
      submissionDate: "09/22/2024",
      priority: "High",
    },
    {
      id: "239509",
      subject: "End points failing",
      status: "Open",
      submissionDate: "09/18/2024",
      priority: "Medium",
    },
    {
      id: "192235",
      subject: "Policy group not found",
      status: "In progress",
      submissionDate: "09/11/2024",
      priority: "Medium",
    },
    {
      id: "794299",
      subject: "App not connecting",
      status: "In progress",
      submissionDate: "09/18/2024",
      priority: "High",
    },
    {
      id: "396060",
      subject: "URL not working for tenant",
      status: "Closed",
      submissionDate: "08/21/2024",
      priority: "High",
    },
    {
      id: "295939",
      subject: "Admin permissions not working",
      status: "Closed",
      submissionDate: "08/04/2024",
      priority: "High",
    },
  ];

  // Filter tickets based on search query
  const filteredTickets = allTickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.includes(searchQuery) ||
      ticket.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTickets = filteredTickets.slice(startIndex, endIndex);

  const getStatusClass = (status) => {
    switch (status) {
      case "Open":
        return styles.statusOpen;
      case "In progress":
        return styles.statusInProgress;
      case "Closed":
        return styles.statusClosed;
      default:
        return "";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High":
        return styles.priorityHigh;
      case "Medium":
        return styles.priorityMedium;
      case "Low":
        return styles.priorityLow;
      default:
        return "";
    }
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroBackground}>
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="106.238px" height="176.262px" viewBox="0 0 106.238 140.262" className={styles.heroBackgroundImage}>
            <style>{`.st0{fill:#FFFFFF;}.st1{fill:#05AFFF;}.st2{fill:#0A0913;}`}</style>
            <path className="st1" d="M86.515,75.233L44.398,94.136v25.204l-4.194-4.194l-13.187-13.187l-7.276-7.276l24.658-11.08l17.44-7.823l35.953-16.152c9.13-4.116,11.334-16.094,4.253-23.175L70.012,4.419C60.57-5.023,44.398,1.669,44.398,15.012v20.171L0.115,55.081v19.098l17.44-7.823l39.484-17.713l4.916-2.204V27.302l-0.117,0.058v-6.457l24.677,24.677l-10.944,4.916l0.02,0.039l-46.682,21.01l-0.039-0.078L8.464,80.636c-0.351,0.156-0.683,0.312-0.995,0.488c-4.253,2.302-6.808,6.399-7.354,10.768c-0.527,4.175,0.741,8.583,4.077,11.919l32.051,32.032c9.442,9.442,25.594,2.751,25.594-10.612v-19.82l24.677-11.08l19.722-8.837V66.357L86.515,75.233z"/>
          </svg>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Help Center</h1>
          <p className={styles.heroSubtitle}>View and manage your support tickets</p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <button 
          className={styles.breadcrumbItem}
          onClick={() => router.push("/dashboard")}
        >
          Dashboard
        </button>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={`${styles.breadcrumbItem} ${styles.active}`}>Help Center</span>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>Support tickets</h2>
          <button className={styles.createButton}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create new ticket
          </button>
        </div>

        {/* Search Bar */}
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <svg className={styles.searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tickets Table */}
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeader}>Subject</th>
                <th className={styles.tableHeader}>Status</th>
                <th className={styles.tableHeader}>
                  <div className={styles.headerWithSort}>
                    Submission date
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                  </div>
                </th>
                <th className={styles.tableHeader}>Ticket ID</th>
                <th className={styles.tableHeader}>Priority</th>
                <th className={styles.tableHeader}></th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              {currentTickets.map((ticket) => (
                <tr key={ticket.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <span className={styles.subjectText}>{ticket.subject}</span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${getStatusClass(ticket.status)}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={styles.dateText}>{ticket.submissionDate}</span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={styles.ticketId}>#{ticket.id}</span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.priorityBadge} ${getPriorityClass(ticket.priority)}`}>
                      {ticket.priority}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <button className={styles.menuButton}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="5" r="2"></circle>
                        <circle cx="12" cy="12" r="2"></circle>
                        <circle cx="12" cy="19" r="2"></circle>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={styles.pageButton}
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                className={`${styles.pageNumber} ${currentPage === index + 1 ? styles.pageNumberActive : ""}`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button
              className={styles.pageButton}
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportTicketsClient;
