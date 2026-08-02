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
   fest in den unteren Ecken (zurück links, weiter rechts; `fixed`,
   `lg:hidden`), vor/zurück von jeder Scrollposition aus. Die Fuß-Knöpfe der Schritte bleiben mobil nur für die
   Abschluss-Aktion des letzten Schritts (Bestellung bzw. Host-Aktion).

## Commits

- **cad `main`:** `ae296ef` (Schritt-Leiste am Fuß), `d7a58f0` (StepBadge an
  Überschriften, `hostSchrittAktion`-Snippet), `88285b9` (Host-Aktion volle
  Breite), `45a6e17` (mobile Navigation: SchrittMenue + FloatingStepArrows).
- **oea `new-deployment-dev`:** `8de4ca4a`, `c74abbe5`, `8fe59784`,
  `ab670db8` (Aktionsblock mobil, Konto im Header), `dddef311` (mobile
  Navigation FormularShell + Kundendaten).
- **ui `new-deployment-dev`:** `e506728` (StepBadge), `106c2f8` (Nachbau
  `StepMenuBadge` + `FloatingStepArrows`), `01aeefd` (Angleich an die
  Patch-Referenz der Cloud-Session), `413e3a1` (`StepNavigation`,
  SummaryCard-Kreise).
- **Opus-5-Session 02.08. (Restarbeiten):** ui `01aeefd`/`413e3a1`,
  cad `f56ae3c`, oea `4b7a6cfd`/`bd475780`.

## Architektur-Notizen

- `StepMenuBadge`-Props = `WorkflowNav`-Props (`label`, `steps`, `active`,
  `status: WorkflowStepStatus[]`, `onSelect`) — Status-Typ kommt aus
  `WorkflowNav.svelte`. Das Dropdown rendert `WorkflowNav` selbst
  (`bg-neutral-50 p-3`, `max-h-[70vh] overflow-y-auto`), statt dessen Zeilen
  zu duplizieren: eine Optik-Quelle für Spalte und Menü.
- Eck-Positionen der Pfeil-Kreise sind Vertrag mit den Apps: cad reserviert
  per `max-lg:px-16` (AppShell) 64 px an BEIDEN Rändern unter der
  Host-Abschluss-Aktion, oea legt einen `h-16`-Spacer über die volle Breite.
  Beide Kreise rechts würden den Aktionsblock überdecken.
- Escape schließt das Menü (`<svelte:window onkeydown>`), Klick auf den
  unsichtbaren Backdrop ebenso.
- Der Badge-Kreis wächst mit (`h-[30px] min-w-[30px] px-1.5`) — feste Breite
  bricht bei zweistelligen Schrittzahlen („10/12“).
- cad kapselt die Sprunglogik in `src/lib/components/SchrittMenue.svelte`
  (Hüllflächen brauchen `prepareEnvelopeRows()`, gesperrtes Zeichnen fragt
  per Dialog nach — wie `NavColumn.clickStep`).
- Der Zeichnen-Schritt trägt bewusst KEINE Überschrift (Nutzer-Entscheid),
  dort gibt es also kein Schritt-Menü — Navigation läuft über die
  Pfeil-Kreise; Haustechnik hat als Schaubild ebenfalls keine Überschrift.
- z-Ordnung: Pfeil-Kreise und Menü-Backdrop `z-40`, Menü-Panel `z-50` — damit
  liegen sie UNTER Modals und Overlays (cad-Modal `z-120`, oea-Overlays
  `z-130+`) und verdecken keinen Dialog.
- `StepNavigation` trägt die Schritt-Leiste unter den Abschnitten (Zurück,
  „zu <nächster Schritt>“ mit `StepBadge`, Abschluss-Aktion als Snippet,
  `h-16`-Spacer). Beide oea-Strecken nutzen sie; die cad-Leiste bleibt
  bewusst eigenständig — andere Knopf-Optik (34 px, neutrale Ränder, kein
  Ripple) und die `hostSchrittAktion`-Sonderfälle (`max-lg:px-16`, `xl:hidden`).
- Schritt-Kreise app-weit 26 px: `StepBadge`, `WorkflowNav` und seit `413e3a1`
  auch `SummaryCard` (vorher 28 px).

## Verifikation (2026-08-02, lokal)

- `packages/ui`: `bun run check` 0 Errors, `bun run lint` grün.
- oea `check:baseline` 250 == Baseline, `bun run lint` erstmals 0 Errors,
  vitest 34 grün, Playwright-e2e **111 grün** (der Lauf, den die Cloud nicht
  fahren konnte; zwei mehrdeutige Selektoren dabei repariert).
- cad `check` 68 == Baseline, `bun test` 188 grün, `bun run lint` 0 Errors
  (vorher 84), `din:verify` GRÜN (52 Suiten byte-stabil).
- Playwright-Probe cad 420×800: Pfeil-Kreise unten in BEIDEN Ecken, Menü
  öffnet die Statusliste, Escape schließt.

## Offen

- Optischer Feinschliff nach Jens' Review (Positionen/Größen der Kreise) und
  der manuelle Mobil-Durchlauf auf einem echten Gerät.
- Storybook-Stories sind angelegt (`StepMenuBadge`, `FloatingStepArrows`,
  `StepNavigation`); `FloatingStepArrows` ist nur im verkleinerten
  Storybook-Viewport sichtbar.
- `WorkflowNav` trägt `data-cy="tab-N"`; öffnet ein Test das Schritt-Menü,
  gibt es diese Marker doppelt (Spalte + Menü) — dann per Container
  eingrenzen.
