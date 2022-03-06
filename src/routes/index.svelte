<script>
	import Poster from '../Poster.svelte';

	let showIndex = 1;
</script>

<main>
	<Poster disabled={true} image="radiorebel.jpg" name="Radio Rebel" show={showIndex === 0} />
	<Poster image="fullcourtmiracle.jpg" name="Full Court Miracle" show={showIndex === 1} />
	<Poster image="halloweentownhigh.jpg" name="Halloweentown High" show={showIndex === 2} />
	<Poster image="youwish.jpg" name="You Wish!" show={showIndex === 3} />
	<nav>
		<button
			class="button-57 disabled {showIndex === 0 && 'selected'}"
			role="button"
			on:click={() => (showIndex = 0)}
		>
			<span class="text">Week One</span><span>Mar 4th</span>
		</button>
		<button
			class="button-57 {showIndex === 1 && 'selected'}"
			role="button"
			on:click={() => (showIndex = 1)}
		>
			<span class="text">Week Two</span><span>Mar 11th</span>
		</button>
		<button
			class="button-57 {showIndex === 2 && 'selected'}"
			role="button"
			on:click={() => (showIndex = 2)}
		>
			<span class="text">Week Three</span><span>Mar 18th</span>
		</button>
		<button
			class="button-57 {showIndex === 3 && 'selected'}"
			role="button"
			on:click={() => (showIndex = 3)}
		>
			<span class="text">Week Four</span><span>Mar 25th</span>
		</button>
	</nav>
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@700&family=Shippori+Antique+B1&display=swap');

	main {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		overflow: hidden;
		background-color: #000;
	}

	nav {
		position: absolute;
		top: 0px;
		left: 0px;
		display: flex;
		flex-direction: column;
		gap: 15px 0px;
		padding: 30px;
	}

	.button-57 {
		position: relative;
		overflow: hidden;
		border: 1px solid white;
		color: white;
		display: inline-block;
		font-family: 'Shippori Antique B1', sans-serif;
		padding: 15px;
		text-decoration: none;
		cursor: pointer;
		background: tomato;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
	}

	.disabled {
		background: gray;
	}

	.selected {
		background-color: rgb(187, 96, 80);
	}

	.button-57 span:first-child {
		position: relative;
		transition: color 600ms cubic-bezier(0.48, 0, 0.12, 1);
		z-index: 10;
		font-size: clamp(1rem, 3.5vw, 5rem);
	}

	.button-57 span:last-child {
		color: white;
		display: block;
		position: absolute;
		bottom: 0;
		transition: all 500ms cubic-bezier(0.48, 0, 0.12, 1);
		z-index: 100;
		opacity: 0;
		top: 60%;
		left: 50%;
		transform: translateY(225%) translateX(-50%);
		height: 14px;
		line-height: 13px;
		font-size: clamp(0.75rem, 2vw, 5rem);
	}

	.button-57:after {
		content: '';
		position: absolute;
		bottom: -50%;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		transform-origin: bottom center;
		transition: transform 600ms cubic-bezier(0.48, 0, 0.12, 1);
		transform: skewY(9.3deg) scaleY(0);
		z-index: 50;
	}

	.button-57:hover:after {
		transform-origin: bottom center;
		transform: skewY(9.3deg) scaleY(2);
	}

	.button-57:hover span:last-child {
		transform: translateX(-50%) translateY(-100%);
		opacity: 1;
		transition: all 900ms cubic-bezier(0.48, 0, 0.12, 1);
	}
</style>
