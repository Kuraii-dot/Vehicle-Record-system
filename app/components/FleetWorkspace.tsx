"use client";

import { useState } from "react";
import { activeTrips, ledger, vehicles, VehicleStatus } from "../data/fleet";
import { ScannerStation } from "./ScannerStation";
import { Sidebar } from "./Sidebar";

const stats = [
  { label: "Total vehicles", value: "28", detail: "+2 this year", tone: "navy", bars: [4, 6, 5, 8, 7] },
  { label: "Available", value: "17", detail: "61% of fleet", tone: "green", bars: [5, 6, 7, 7, 8] },
  { label: "Currently in use", value: "7", detail: "4 return by 3 PM", tone: "blue", bars: [3, 5, 4, 7, 6] },
  { label: "Maintenance", value: "3", detail: "1 due back today", tone: "amber", bars: [7, 6, 5, 4, 4] },
  { label: "Overdue", value: "1", detail: "18 min overdue", tone: "red", bars: [1, 1, 2, 1, 3] },
];

const statusClass = (status: VehicleStatus | "Completed" | "Active") => status.toLowerCase().replaceAll(" ", "-");

function AppHeader({ title, onMenu, onSearch }: { title: string; onMenu: () => void; onSearch: (q: string) => void }) {
  return (
    <header className="app-header">
      <div className="header-left"><button className="menu-button" onClick={onMenu} aria-label="Open navigation">☰</button><div><p>Fleet operations / <span>{title}</span></p><strong>Monday, 17 August 2026</strong></div></div>
      <div className="header-tools">
        <label className="global-search"><span>⌕</span><input onChange={(e) => onSearch(e.target.value)} placeholder="Search vehicle, employee, trip…" /><kbd>Ctrl K</kbd></label>
        <button className="notification-button" aria-label="Notifications"><span>!</span><b>3</b></button>
        <div className="user-chip"><div>ER</div><p><strong>Elena Reyes</strong><span>Fleet Administrator</span></p><i>⌄</i></div>
      </div>
    </header>
  );
}

function VehicleBadge({ name, plate, color }: { name: string; plate: string; color: string }) {
  return <div className="vehicle-cell"><div className={`vehicle-tile ${color}`}><span>{name.split(" ").at(-1)?.slice(0, 2).toUpperCase()}</span></div><div><strong>{name}</strong><small>{plate}</small></div></div>;
}

function Dashboard({ onScanner, onNavigate }: { onScanner: () => void; onNavigate: (name: string) => void }) {
  return (
    <>
      <section className="hero-row">
        <div><p className="eyebrow">Operations command center</p><h1>Good morning, Elena.</h1><p>Here&apos;s the live movement and readiness of your vehicle fleet.</p></div>
        <div className="hero-actions"><button className="secondary-action">+ New reservation</button><button className="primary-action" onClick={onScanner}><span className="scan-icon">ID</span> Open scanner station</button></div>
      </section>

      <section className="stats-grid" aria-label="Fleet summary">
        {stats.map((stat) => <article className={`stat-card stat-${stat.tone}`} key={stat.label}><div className="stat-top"><span className="status-glyph" /><p>{stat.label}</p></div><div className="stat-value"><strong>{stat.value}</strong><div className="micro-bars">{stat.bars.map((h, i) => <i key={i} style={{ height: `${h * 3}px` }} />)}</div></div><small>{stat.detail}</small></article>)}
      </section>

      <section className="dashboard-grid">
        <article className="panel active-panel">
          <div className="panel-heading"><div><p className="eyebrow">Live dispatch</p><h2>Vehicles currently out</h2></div><button onClick={() => onNavigate("Active vehicles")}>View all 7 <span>→</span></button></div>
          <div className="table-scroll"><table className="fleet-table"><thead><tr><th>Vehicle</th><th>In custody of</th><th>Time out</th><th>Trip</th><th>Expected</th><th>Status</th><th /></tr></thead><tbody>{activeTrips.slice(0, 4).map((trip) => <tr key={trip.id} className={trip.status === "Overdue" ? "overdue-row" : ""}><td><VehicleBadge name={trip.vehicle} plate={trip.plate} color={trip.color} /></td><td><div className="person-cell"><span>{trip.initials}</span><div><strong>{trip.employee}</strong><small>{trip.department}</small></div></div></td><td><strong>{trip.timeOut}</strong><small>{trip.elapsed} elapsed</small></td><td><strong>{trip.destination}</strong><small>{trip.purpose}</small></td><td><strong>{trip.expected}</strong><small>{trip.status === "Overdue" ? "18 min past due" : "Today"}</small></td><td><span className={`status-badge ${statusClass(trip.status)}`}><i />{trip.status}</span></td><td><button className="row-menu" aria-label={`Open ${trip.id}`}>•••</button></td></tr>)}</tbody></table></div>
        </article>

        <article className="panel availability-panel">
          <div className="panel-heading"><div><p className="eyebrow">Fleet readiness</p><h2>Vehicle availability</h2></div><button className="icon-button">•••</button></div>
          <div className="availability-total"><div><strong>61%</strong><span>ready now</span></div><p><b>17</b> of 28 vehicles are available for dispatch</p></div>
          <div className="capacity-bar"><i className="cap-available" /><i className="cap-use" /><i className="cap-maint" /><i className="cap-unavailable" /></div>
          <div className="availability-list"><div><span className="legend available" />Available <b>17</b></div><div><span className="legend in-use" />In use <b>7</b></div><div><span className="legend maintenance" />Maintenance <b>3</b></div><div><span className="legend unavailable" />Unavailable <b>1</b></div></div>
          <div className="readiness-note"><span>✓</span><p><strong>Dispatch capacity is healthy</strong><small>6 vehicles are reserved this afternoon.</small></p></div>
        </article>

        <article className="panel usage-panel">
          <div className="panel-heading"><div><p className="eyebrow">Last 7 days</p><h2>Fleet movement</h2></div><select aria-label="Fleet movement metric"><option>Trips completed</option><option>Distance travelled</option></select></div>
          <div className="chart-summary"><strong>86</strong><span>total trips</span><em>↑ 12.4% vs. prior week</em></div>
          <div className="bar-chart" aria-label="Weekly trips bar chart">{[{d:"Mon",v:62,n:11},{d:"Tue",v:82,n:15},{d:"Wed",v:70,n:13},{d:"Thu",v:94,n:17},{d:"Fri",v:76,n:14},{d:"Sat",v:43,n:8},{d:"Sun",v:39,n:8}].map((x) => <div key={x.d}><span>{x.n}</span><i style={{ height: `${x.v}px` }} /><small>{x.d}</small></div>)}</div>
        </article>

        <article className="panel activity-panel">
          <div className="panel-heading"><div><p className="eyebrow">Recorded today</p><h2>Recent activity</h2></div><button>Open audit trail</button></div>
          <div className="activity-list">
            <div><span className="activity-mark checkout">OUT</span><p><strong>Juan Dela Cruz</strong> checked out <b>Toyota Hilux</b><small>8:41 AM · TRP-2026-0841 · Elena Reyes</small></p></div>
            <div><span className="activity-mark return">IN</span><p><strong>Maria Santos</strong> returned <b>Mitsubishi L300</b><small>8:12 AM · 68 km travelled · Good condition</small></p></div>
            <div><span className="activity-mark maintenance">MT</span><p><strong>Ford Everest</strong> moved to maintenance<small>7:55 AM · Preventive service · Carlo Diaz</small></p></div>
            <div><span className="activity-mark reserve">RS</span><p><strong>Reservation approved</strong> for Finance Division<small>7:38 AM · Toyota Innova · 1:30 PM today</small></p></div>
          </div>
        </article>
      </section>
    </>
  );
}

function ActiveVehicles() {
  return <section className="page-section"><div className="section-title"><div><p className="eyebrow">Real-time custody</p><h1>Active vehicles</h1><p>Every vehicle currently away from the dispatch area.</p></div><div className="section-actions"><button>Export movement list</button><button className="primary-action">+ Manual check-out</button></div></div><div className="alert-strip"><span>!</span><p><strong>1 vehicle requires attention.</strong> Mitsubishi L300 · NGS 5678 is 18 minutes past its expected return.</p><button>Contact custodian</button></div><div className="filter-bar"><button className="filter-active">All active <b>7</b></button><button>On schedule <b>6</b></button><button>Overdue <b>1</b></button><div /><input placeholder="Filter active vehicles…" /></div><article className="panel active-full"><table className="fleet-table"><thead><tr><th>Vehicle / Trip</th><th>Employee / Department</th><th>Driver</th><th>Time out / Elapsed</th><th>Purpose / Destination</th><th>Expected return</th><th>Status</th></tr></thead><tbody>{activeTrips.concat(activeTrips.slice(0,3).map((x, i) => ({...x,id:`TRP-2026-083${5-i}`,vehicle:["Honda City","Toyota Hiace","Nissan Urvan"][i],plate:["NFA 3402","NCR 7710","NBE 9091"][i],employee:["Carla Gomez","Ernesto Lim","Miguel Aquino"][i],initials:["CG","EL","MA"][i],status:"In use" as const}))).map((trip) => <tr key={trip.id}><td><VehicleBadge name={trip.vehicle} plate={trip.plate} color={trip.color} /><small className="trip-id">{trip.id}</small></td><td><div className="person-cell"><span>{trip.initials}</span><div><strong>{trip.employee}</strong><small>{trip.department}</small></div></div></td><td>{trip.driver}</td><td><strong>{trip.timeOut}</strong><small>{trip.elapsed}</small></td><td><strong>{trip.purpose}</strong><small>{trip.destination}</small></td><td><strong>{trip.expected}</strong><small>Today</small></td><td><span className={`status-badge ${statusClass(trip.status)}`}><i />{trip.status}</span></td></tr>)}</tbody></table></article></section>;
}

function VehicleLedger() {
  return <section className="page-section"><div className="section-title"><div><p className="eyebrow">Permanent vehicle record</p><h1>Vehicle ledger</h1><p>Complete, chronological and audit-ready usage history.</p></div><div className="section-actions"><button>Print ledger</button><button className="primary-action">Export CSV</button></div></div><article className="ledger-vehicle-card"><div className="vehicle-hero-thumb slate"><span>HILUX</span></div><div className="ledger-identity"><p className="eyebrow">Selected vehicle</p><h2>Toyota Hilux</h2><span>NCR 1834 · 2022 Pickup · Engineering Division</span></div><span className="status-badge in-use"><i />In use</span><dl><div><dt>Current odometer</dt><dd>48,621 km</dd></div><div><dt>Total trips</dt><dd>284</dd></div><div><dt>Lifetime distance</dt><dd>42,187 km</dd></div><div><dt>Last service</dt><dd>Jul 18, 2026</dd></div></dl></article><div className="ledger-tabs"><button className="active">Usage ledger</button><button>Vehicle overview</button><button>Statistics</button><button>Maintenance</button><button>Documents</button></div><div className="ledger-filters"><label>Date range<input value="01 Aug 2026 — 17 Aug 2026" readOnly /></label><label>Department<select><option>All departments</option></select></label><label>Status<select><option>All records</option></select></label><button>More filters</button><span>4 records · 608 km</span></div><article className="panel ledger-table-panel"><table className="fleet-table ledger-table"><thead><tr><th>Transaction</th><th>Date</th><th>Employee</th><th>Time out / in</th><th>Purpose / destination</th><th>Odometer</th><th>Distance</th><th>Status</th></tr></thead><tbody>{ledger.map((row) => <tr key={row.id}><td><strong className="link-text">{row.id}</strong><small>Recorded by E. Reyes</small></td><td><strong>{row.date}</strong><small>{row.department}</small></td><td><strong>{row.employee}</strong><small>{row.department} Division</small></td><td><strong>{row.out} — {row.in}</strong><small>{row.in === "—" ? "2h 18m elapsed" : "Completed same day"}</small></td><td><strong>{row.purpose}</strong><small>{row.destination}</small></td><td><strong>{row.start} → {row.end}</strong><small>kilometers</small></td><td><strong>{row.distance}</strong></td><td><span className={`status-badge ${statusClass(row.status as "Active" | "Completed")}`}><i />{row.status}</span></td></tr>)}</tbody></table><footer className="table-footer"><span>Showing 1–4 of 284 records</span><div><button disabled>Previous</button><button>Next</button></div></footer></article></section>;
}

function VehiclesPage() {
  return <section className="page-section"><div className="section-title"><div><p className="eyebrow">Fleet registry</p><h1>Vehicles</h1><p>Registration, assignment, readiness and lifetime movement records.</p></div><button className="primary-action">+ Register vehicle</button></div><div className="registry-summary"><span><b>28</b> registered vehicles</span><span><i className="legend available" />17 available</span><span><i className="legend in-use" />7 in use</span><span><i className="legend maintenance" />3 maintenance</span><div /><input placeholder="Search plate or vehicle…" /><button>Filters</button></div><div className="vehicle-grid">{vehicles.map((vehicle) => <article className="vehicle-card" key={vehicle.plate}><div className={`vehicle-card-image ${vehicle.color}`}><span>{vehicle.type.toUpperCase()}</span><small>{vehicle.plate}</small></div><div className="vehicle-card-body"><div><p>{vehicle.type} · {vehicle.dept}</p><h2>{vehicle.name}</h2></div><span className={`status-badge ${statusClass(vehicle.status)}`}><i />{vehicle.status}</span><dl><div><dt>Current odometer</dt><dd>{vehicle.odometer}</dd></div><div><dt>Last movement</dt><dd>{vehicle.status === "Available" ? "Aug 14, 2026" : vehicle.status}</dd></div></dl><button>Open vehicle record <span>→</span></button></div></article>)}</div></section>;
}

function GenericModule({ name }: { name: string }) {
  const descriptions: Record<string, string> = { Reservations: "Review upcoming requests, approvals and dispatch commitments.", "Vehicle calendar": "See reservations, active trips, maintenance and unavailable periods together.", "Trip history": "Search every active and completed movement transaction.", "Employee usage": "Review individual vehicle use, distance and frequency over time.", Employees: "Manage company identities, departments and vehicle-use authorization.", Drivers: "Monitor designated drivers, license validity and availability.", Departments: "Maintain divisions and compare their vehicle utilization.", "Reports & analytics": "Build audit-ready utilization, movement and accountability reports.", "Users & roles": "Control access through organization roles and enforced permissions.", "Audit trail": "Review immutable records of every operational and administrative action.", Settings: "Configure dispatch rules, reminders, statuses and organization details." };
  return <section className="page-section"><div className="section-title"><div><p className="eyebrow">MOTOR module</p><h1>{name}</h1><p>{descriptions[name] ?? "Manage this area of fleet operations."}</p></div><button className="primary-action">Create new</button></div><article className="module-preview"><div className="module-preview-mark">{name.split(" ").map((x) => x[0]).join("").slice(0,2)}</div><div><span>Operational workspace</span><h2>{name} is ready for your organization&apos;s workflow.</h2><p>This prototype includes the navigation and product architecture for this module. Connect organization data and policies to activate its full records workflow.</p><div><button className="primary-action">Configure module</button><button>View documentation</button></div></div></article><div className="module-cards"><article><span>01</span><h3>Structured records</h3><p>Consistent data entry with validation and accountable ownership.</p></article><article><span>02</span><h3>Permission-aware</h3><p>Designed for administrator, fleet officer, supervisor and employee access.</p></article><article><span>03</span><h3>Audit ready</h3><p>Every important change is attributable and retained in history.</p></article></div></section>;
}

export function FleetWorkspace() {
  const [active, setActive] = useState("Dashboard");
  const [scannerOpen, setScannerOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState("");
  const [search, setSearch] = useState("");

  const navigate = (name: string) => {
    if (name === "Check-out / Check-in") setScannerOpen(true);
    else setActive(name);
  };

  const showToast = (message: string) => { setToast(message); setTimeout(() => setToast(""), 4800); };

  return (
    <div className="app-shell">
      <Sidebar active={active} onNavigate={navigate} open={mobileNav} onClose={() => setMobileNav(false)} />
      <div className="app-main">
        <AppHeader title={active} onMenu={() => setMobileNav(true)} onSearch={setSearch} />
        <main className="workspace">
          {search && <div className="search-results"><div><span>⌕</span><p>Search results for <strong>“{search}”</strong><small>Press Enter to open the full organization search.</small></p></div><button onClick={() => setSearch("")}>Clear</button></div>}
          {active === "Dashboard" && <Dashboard onScanner={() => setScannerOpen(true)} onNavigate={navigate} />}
          {active === "Active vehicles" && <ActiveVehicles />}
          {active === "Vehicle ledger" && <VehicleLedger />}
          {active === "Vehicles" && <VehiclesPage />}
          {!["Dashboard", "Active vehicles", "Vehicle ledger", "Vehicles"].includes(active) && <GenericModule name={active} />}
        </main>
      </div>
      <ScannerStation open={scannerOpen} onClose={() => setScannerOpen(false)} onComplete={showToast} />
      {toast && <div className="toast"><span>✓</span><p><strong>Dispatch completed</strong>{toast}</p><button onClick={() => setToast("")}>×</button></div>}
    </div>
  );
}
