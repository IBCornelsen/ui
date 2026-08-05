<script lang="ts">
	// Reiter-Label der Formular-Strecken: sitzt auf der Oberkante eines umrahmten
	// Feldes und braucht daher einen `relative` Elternknoten (in oea: .input-standard).
	interface Props {
		title: string;
	}

	let { title }: Props = $props();
</script>

<div
	class="absolute top-[-1.275rem] -left-[1px] rounded-t-sm border-x-[1px] border-t-[1px] border-black/25 pr-2 pl-1 font-sans text-[0.8rem]"
>
	{title}
</div>
