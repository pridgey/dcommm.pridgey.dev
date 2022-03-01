<script>
	export let image = '';
	export let name = '';
	export let show = false;
</script>

<div style="--background:url({image});--showPoster:{show ? '0px' : '-100%'}">{name}</div>

<style>
	@font-face {
		font-family: 'Cabin';
		font-style: normal;
		font-weight: 700;
		src: local('/Cabin-Bold'), format('ttg');
	}

	div {
		width: 100vw;
		height: 100vh;
		position: absolute;
		box-sizing: border-box;
		background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)) 0% 0% / cover,
			var(--background) center center;
		background-size: cover;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		top: 0px;
		right: var(--showPoster);
		transition: right 0.5s;
		transition-timing-function: ease;
		font-family: 'Cabin', sans-serif;
		font-size: clamp(1rem, 15vw, 10rem);
		color: white;
		padding-bottom: 15vh;
	}
</style>
