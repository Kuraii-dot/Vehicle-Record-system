"use client";

import { useEffect, useRef, useState } from "react";
import { vehicles } from "../data/fleet";

type ScannerStationProps = { open: boolean; onClose: () => void; onComplete: (message: string) => void };

export function ScannerStation({ open, onClose, onComplete }: ScannerStationProps) {
  const [step, setStep] = useState(0);
  const [scan, setScan] = useState("");
  const [selected, setSelected] = useState("Nissan Navara");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setStep(0);
      setScan("");
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [open]);

  if (!open) return null;

  const identify = () => {
    if (scan.trim()) setStep(1);
  };

  return (
    <div className="scanner-shell" role="dialog" aria-modal="true" aria-label="Vehicle check-out station">
      <header className="scanner-header">
        <div className="scanner-brand"><span>M</span><div><strong>VEHICLE RECORDING SYSTEM</strong><small>Secure dispatch station · Terminal 01</small></div></div>
        <button className="scanner-exit" onClick={onClose}>Exit station</button>
      </header>

      <main className="scanner-main">
        {step === 0 && (
          <section className="scan-panel">
            <div className="scan-status"><span /> Scanner ready</div>
            <div className="id-card-visual"><div className="scan-line" /><span>ID</span></div>
            <p className="eyebrow">Company identification</p>
            <h1>Scan your Employee ID</h1>
            <p className="scan-help">Tap your ID card on the reader or enter your employee number below.</p>
            <div className="scan-entry">
              <input ref={inputRef} value={scan} onChange={(e) => setScan(e.target.value)} onKeyDown={(e) => e.key === "Enter" && identify()} placeholder="Employee ID / RFID" aria-label="Employee ID or RFID" />
              <button onClick={identify} disabled={!scan.trim()}>Continue</button>
            </div>
            <button className="demo-link" onClick={() => { setScan("EMP-2019-0147"); setStep(1); }}>Use demo ID · EMP-2019-0147</button>
            <div className="station-note"><span>i</span> Your information is cleared automatically after 60 seconds of inactivity.</div>
          </section>
        )}

        {step === 1 && (
          <section className="checkout-panel">
            <div className="checkout-heading">
              <div className="employee-photo">JD</div>
              <div><p className="eyebrow">Identity verified</p><h1>Welcome, Juan Dela Cruz</h1><p>EMP-2019-0147 · Engineering Division · Project Engineer II</p></div>
              <span className="verified-badge">Authorized</span>
            </div>
            <div className="step-rail"><span className="done">1</span><i /><span className="current">2</span><i /><span>3</span><p>Identity</p><p>Select vehicle</p><p>Trip details</p></div>
            <div className="checkout-content">
              <h2>Choose an available vehicle</h2>
              <p>Only dispatch-ready vehicles assigned to your access level are shown.</p>
              <div className="vehicle-choice-grid">
                {vehicles.filter((v) => v.status === "Available").concat([{ name: "Toyota Hiace", plate: "NCR 7710", type: "Commuter van", status: "Available", odometer: "44,102 km", dept: "Administrative", color: "blue" }]).map((v) => (
                  <button key={v.name} className={selected === v.name ? "vehicle-choice selected" : "vehicle-choice"} onClick={() => setSelected(v.name)}>
                    <div className={`vehicle-thumb ${v.color}`}><span>{v.type.toUpperCase()}</span></div>
                    <div><strong>{v.name}</strong><span>{v.plate} · {v.odometer}</span></div>
                    <em>Available</em>
                  </button>
                ))}
              </div>
              <div className="scanner-actions"><button className="secondary" onClick={() => setStep(0)}>Back</button><button className="primary" onClick={() => setStep(2)}>Continue with {selected}</button></div>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="checkout-panel trip-form-panel">
            <div className="checkout-heading compact"><div><p className="eyebrow">Check-out details</p><h1>{selected}</h1><p>NDR 9031 · Latest odometer 18,440 km</p></div><span className="available-badge">Available</span></div>
            <div className="step-rail"><span className="done">1</span><i /><span className="done">2</span><i /><span className="current">3</span><p>Identity</p><p>Vehicle</p><p>Trip details</p></div>
            <div className="form-grid">
              <label className="wide">Purpose of travel<input defaultValue="Project site validation" /></label>
              <label className="wide">Destination<input defaultValue="Barangay San Fermin, San Pablo City" /></label>
              <label>Expected return<input type="time" defaultValue="15:30" /></label>
              <label>Starting odometer<input defaultValue="18,440" /><span className="unit">km</span></label>
              <label>Driver<select defaultValue="self"><option value="self">Juan Dela Cruz (self)</option><option>Ramon Villanueva</option></select></label>
              <label>Passengers<input type="number" defaultValue="2" min="0" /></label>
              <label className="wide">Remarks (optional)<input placeholder="Add dispatch notes" /></label>
            </div>
            <div className="integrity-note"><span>✓</span><div><strong>Odometer verified</strong><p>Starting reading matches the vehicle&apos;s latest recorded odometer.</p></div></div>
            <div className="scanner-actions"><button className="secondary" onClick={() => setStep(1)}>Back</button><button className="primary" onClick={() => setStep(3)}>Review and confirm</button></div>
          </section>
        )}

        {step === 3 && (
          <section className="complete-panel">
            <div className="complete-mark">✓</div>
            <p className="eyebrow">Transaction recorded</p>
            <h1>Vehicle checked out</h1>
            <p>Your official trip record has been created and the vehicle is now marked <strong>IN USE</strong>.</p>
            <div className="receipt-card"><span>TRP-2026-0842</span><strong>{selected}</strong><p>NDR 9031 · Juan Dela Cruz</p><dl><div><dt>Time out</dt><dd>11:02 AM</dd></div><div><dt>Expected return</dt><dd>3:30 PM</dd></div><div><dt>Destination</dt><dd>Brgy. San Fermin</dd></div></dl></div>
            <button className="primary finish-button" onClick={() => { onComplete("TRP-2026-0842 recorded · Nissan Navara is now IN USE"); onClose(); }}>Finish</button>
          </section>
        )}
      </main>
    </div>
  );
}
