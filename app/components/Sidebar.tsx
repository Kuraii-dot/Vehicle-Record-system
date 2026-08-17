"use client";

type SidebarProps = {
  active: string;
  onNavigate: (item: string) => void;
  open: boolean;
  onClose: () => void;
};

const groups = [
  { label: "Overview", items: ["Dashboard"] },
  { label: "Vehicle operations", items: ["Check-out / Check-in", "Active vehicles", "Reservations", "Vehicle calendar"] },
  { label: "Records", items: ["Vehicle ledger", "Trip history", "Employee usage"] },
  { label: "Management", items: ["Vehicles", "Employees", "Drivers", "Departments"] },
  { label: "Reports", items: ["Reports & analytics"] },
  { label: "System", items: ["Users & roles", "Audit trail", "Settings"] },
];

const marks: Record<string, string> = {
  Dashboard: "DB",
  "Check-out / Check-in": "ID",
  "Active vehicles": "AV",
  Reservations: "RS",
  "Vehicle calendar": "CL",
  "Vehicle ledger": "LG",
  "Trip history": "TH",
  "Employee usage": "EU",
  Vehicles: "VH",
  Employees: "EP",
  Drivers: "DR",
  Departments: "DP",
  "Reports & analytics": "RA",
  "Users & roles": "UR",
  "Audit trail": "AT",
  Settings: "ST",
};

export function Sidebar({ active, onNavigate, open, onClose }: SidebarProps) {
  return (
    <>
      {open && <button className="sidebar-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><span>M</span></div>
          <div><strong>MOTOR</strong><small>Fleet accountability system</small></div>
        </div>

        <div className="control-badge">
          <span className="control-dot" />
          <div><strong>Dispatch control</strong><small>All systems operational</small></div>
        </div>

        <nav className="nav-groups" aria-label="Primary navigation">
          {groups.map((group) => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.items.map((item) => (
                <button
                  key={item}
                  className={active === item ? "nav-active" : ""}
                  onClick={() => { onNavigate(item); onClose(); }}
                >
                  <span className="nav-mark">{marks[item]}</span>
                  <span>{item}</span>
                  {item === "Active vehicles" && <b>7</b>}
                  {item === "Reservations" && <b className="muted-count">3</b>}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="footer-seal">OF</div>
          <div><strong>Office of Fleet Services</strong><small>Operations center · NCR</small></div>
        </div>
      </aside>
    </>
  );
}
