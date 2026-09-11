<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";

	const { Story } = defineMeta({
		title: "Design/Typografie",
		tags: ["autodocs"]
	});
</script>

<!-- Die Schriftklassen des Hauses aus typografie.css. Diese Story ist der Ort, an
     dem sich die Skala prüfen lässt, bevor sie auf einer Seite landet.

     Die Klassennamen stehen bewusst ausgeschrieben und nicht in einer Schleife:
     Tailwind erzeugt eine Utility nur, wenn es sie als Zeichenkette im Quelltext
     findet. Aus einer Variablen gelesen entstünde die Regel nicht. -->

{#snippet zeile(klasse: string, inhalt: import("svelte").Snippet)}
	<div class="flex items-baseline gap-4">
		<code class="w-24 shrink-0 code-inline">{klasse}</code>
		{@render inhalt()}
	</div>
{/snippet}

<Story name="Skala">
	<div class="flex max-w-3xl flex-col gap-8 p-6">
		<section>
			<p class="mb-3 label-sm">Überschriften</p>
			<div class="flex flex-col gap-3">
				{#snippet h1Text()}<span class="h1">Energieausweis online erstellen</span>{/snippet}
				{#snippet h2Text()}<span class="h2">Energieausweis online erstellen</span>{/snippet}
				{#snippet h3Text()}<span class="h3">Energieausweis online erstellen</span>{/snippet}
				{#snippet h4Text()}<span class="h4">Energieausweis online erstellen</span>{/snippet}
				{#snippet h5Text()}<span class="h5">Energieausweis online erstellen</span>{/snippet}
				{@render zeile("h1", h1Text)}
				{@render zeile("h2", h2Text)}
				{@render zeile("h3", h3Text)}
				{@render zeile("h4", h4Text)}
				{@render zeile("h5", h5Text)}
			</div>
		</section>

		<section>
			<p class="mb-3 label-sm">Fließtext</p>
			<div class="flex flex-col gap-3">
				{#snippet bodyLg()}<span class="body-lg">Bausubstanz und Anlagentechnik</span>{/snippet}
				{#snippet bodyMd()}<span class="body-md">Bausubstanz und Anlagentechnik</span>{/snippet}
				{#snippet bodySm()}<span class="body-sm">Bausubstanz und Anlagentechnik</span>{/snippet}
				{#snippet bodyXs()}<span class="body-xs">Bausubstanz und Anlagentechnik</span>{/snippet}
				{#snippet leadText()}<span class="lead">Bausubstanz und Anlagentechnik</span>{/snippet}
				{#snippet mutedText()}<span class="muted">Bausubstanz und Anlagentechnik</span>{/snippet}
				{#snippet captionText()}<span class="caption">Bausubstanz und Anlagentechnik</span
					>{/snippet}
				{@render zeile("body-lg", bodyLg)}
				{@render zeile("body-md", bodyMd)}
				{@render zeile("body-sm", bodySm)}
				{@render zeile("body-xs", bodyXs)}
				{@render zeile("lead", leadText)}
				{@render zeile("muted", mutedText)}
				{@render zeile("caption", captionText)}
			</div>
		</section>

		<section>
			<p class="mb-3 label-sm">Auszeichnungen</p>
			<div class="flex flex-col gap-3">
				{#snippet labelLg()}<span class="label-lg">Gebäudeenergiegesetz</span>{/snippet}
				{#snippet labelMd()}<span class="label-md">Gebäudeenergiegesetz</span>{/snippet}
				{#snippet labelSm()}<span class="label-sm">Gebäudeenergiegesetz</span>{/snippet}
				{#snippet eyebrowText()}<span class="eyebrow">Gebäudeenergiegesetz</span>{/snippet}
				{@render zeile("label-lg", labelLg)}
				{@render zeile("label-md", labelMd)}
				{@render zeile("label-sm", labelSm)}
				{@render zeile("eyebrow", eyebrowText)}
			</div>
		</section>

		<section>
			<p class="mb-3 label-sm">Link</p>
			<p class="body-md">
				Ein <a class="link" href="#typografie">Textlink im Fließtext</a> trägt die Klasse
				<code class="code-inline">link</code>. Innerhalb von
				<code class="code-inline">prose</code> bekommt jedes
				<code class="code-inline">a</code> sie automatisch.
			</p>
		</section>
	</div>
</Story>

<Story name="Prose">
	<!-- prose formatiert einen ganzen Fließtextbereich, ohne dass jedes Element
	     eine eigene Klasse braucht — so entstehen die Inhaltsseiten der Website. -->
	<div class="prose max-w-3xl p-6">
		<h1>Energieausweis</h1>
		<p>
			Ein Energieausweis bewertet, wie viel Energie ein Gebäude für Heizung und Warmwasser benötigt.
			Bei Verkauf, Vermietung und Verpachtung ist er Pflicht.
		</p>

		<h2>Bedarfs- oder Verbrauchsausweis</h2>
		<p>
			In den meisten Fällen darf frei gewählt werden. Das Gebäudeenergiegesetz schreibt den
			Bedarfsausweis aber in zwei Fällen vor — bei <strong>Neubauten</strong> und bei kleineren
			Wohngebäuden aus der Zeit vor der ersten Wärmeschutzverordnung. Mehr dazu im
			<a href="#prose">Gesetzestext</a>.
		</p>

		<h3>Benötigte Unterlagen</h3>
		<ul>
			<li>Heizkostenabrechnungen über drei zusammenhängende Jahre</li>
			<li>Baujahr von Gebäude und Heizung</li>
			<li>Fotos von Dach, Fenstern, Heizung und Außenwand</li>
		</ul>

		<h3>Ablauf</h3>
		<ol>
			<li>Ausweisart wählen</li>
			<li>Gebäudedaten eingeben</li>
			<li>Fachliche Prüfung</li>
		</ol>

		<blockquote>
			Ein Energieausweis wird für eine Gültigkeitsdauer von zehn Jahren ausgestellt.
		</blockquote>

		<table>
			<thead>
				<tr>
					<th>Merkmal</th>
					<th>Verbrauchsausweis</th>
					<th>Bedarfsausweis</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td>Grundlage</td>
					<td>Drei Jahresverbräuche</td>
					<td>Bausubstanz und Anlagentechnik</td>
				</tr>
				<tr>
					<td>Nutzerverhalten</td>
					<td>fließt ein</td>
					<td>bleibt außen vor</td>
				</tr>
			</tbody>
		</table>
	</div>
</Story>
