# Übergabe: Mobile Schritt-Navigation (cad + oea + @ibc/ui)

Stand 2026-08-02. Rekonstruiert — das ursprüngliche Übergabedokument der
Cloud-Session (session_01Q7MpNwgmeAYz7jQdTu8kyq) hat den Weg aus der
Cloud-Umgebung nie geschafft, ebenso wenig wie der zugehörige ui-Commit.

## Was gebaut wurde

Einheitliche Schritt-Navigation für schmale Viewports (unter `lg`) in beiden
Strecken — cad-Workflow (Bedarfsausweis-Embed) und oea-Formulare
(Verbrauchsausweis + Kundendaten/Abschluss):

1. **Kopfzeilen-Schrittanzeige und Hamburger entfallen.** Die Workflow-Spalte
   (`WorkflowNav` bzw. cad `NavColumn`) steht erst ab `lg`.
2. **Klebende Schritt-Überschrift:** `StepBadge` (blauer Nummernkreis) +
   Titel, unter `lg` sticky oben im Scrollbereich.
3. **`StepMenuBadge`** (`@ibc/ui`): blauer „aktuell/gesamt“-Kreis (z. B. „3/7“)
   rechts neben der Überschrift, klappt die komplette Schrittliste mit
   Status-Kreisen auf (Optik `WorkflowNav`: Haken = fertig, orange = nach
   Abschluss-Prüfung blockiert, Nummer = offen) und springt Schritte direkt an.
4. **`FloatingStepArrows`** (`@ibc/ui`): zwei schwebende blaue Pfeil-Kreise
   fest unten rechts (`fixed`, `lg:hidden`), vor/zurück von jeder
   Scrollposition aus. Die Fuß-Knöpfe der Schritte bleiben mobil nur für die
   Abschluss-Aktion des letzten Schritts (Bestellung bzw. Host-Aktion).

## Commits

- **cad `main`:** `ae296ef` (Schritt-Leiste am Fuß), `d7a58f0` (StepBadge an
  Überschriften, `hostSchrittAktion`-Snippet), `88285b9` (Host-Aktion volle
  Breite), `45a6e17` (mobile Navigation: SchrittMenue + FloatingStepArrows).
- **oea `new-deployment-dev`:** `8de4ca4a`, `c74abbe5`, `8fe59784`,
  `ab670db8` (Aktionsblock mobil, Konto im Header), `dddef311` (mobile
  Navigation FormularShell + Kundendaten).
- **ui `new-deployment-dev`:** `e506728` (StepBadge) und der NACHGEBAUTE
  Commit mit `StepMenuBadge` + `FloatingStepArrows` (dieses Dokument liegt
  im selben Commit).

## Architektur-Notizen

- `StepMenuBadge`-Props = `WorkflowNav`-Props (`label`, `steps`, `active`,
  `status: WorkflowStepStatus[]`, `onSelect`) — Status-Typ kommt aus
  `WorkflowNav.svelte`.
- cad kapselt die Sprunglogik in `src/lib/components/SchrittMenue.svelte`
  (Hüllflächen brauchen `prepareEnvelopeRows()`, gesperrtes Zeichnen fragt
  per Dialog nach — wie `NavColumn.clickStep`).
- Der Zeichnen-Schritt trägt bewusst KEINE Überschrift (Nutzer-Entscheid),
  dort gibt es also kein Schritt-Menü — Navigation läuft über die
  Pfeil-Kreise; Haustechnik hat als Schaubild ebenfalls keine Überschrift.
- z-Ordnung: Backdrop des Menüs `z-140`, Menü `z-150`, Pfeil-Kreise `z-130`
  (unter den oea-Overlays der rechten Karte).

## Verifikation (2026-08-02, lokal)

- `packages/ui`: `bun run check` 0 Errors, `bun run lint` grün.
- oea `check:baseline`: 250 == Baseline. cad `check`: 68 == Baseline.
- Playwright-Probe cad 420×800: Pfeil-Kreise sichtbar, Menü öffnet mit
  Statusliste, Sprung zu „Hüllflächen prüfen“ füllt die Tabelle.
- `din:verify` lokal (die Cloud-Session konnte Schritte 3+4 nicht laufen
  lassen — Projekt-XMLs liegen nicht im Repo).

## Offen

- Optischer Feinschliff nach Jens' Review (Positionen/Größen der Kreise).
- Storybook-Stories sind angelegt (`StepMenuBadge`, `FloatingStepArrows`);
  `FloatingStepArrows` ist nur im verkleinerten Storybook-Viewport sichtbar.
