<script setup lang="js">
	import html2canvas from 'html2canvas';

	   function saveAsPNG() {
	       const divToSave = document.querySelector('.ticket');
	       html2canvas(divToSave).then(canvas => {
	           const link = document.createElement('a');
	           link.href = canvas.toDataURL();
	           link.download = 'cinemax-movie-ticket.png';
	           link.click();
	       });
	   }
</script>

<template>
	<div class="flex-grow flex flex-col justify-center items-center space-y-2">
		<div
			class="ticket md:w-[50%] h-[28rem] flex border-[2px] border-dashed bg-[#F0E8E3] relative">
			<h1 class="absolute top-2 left-2 text-[#bf6f33] font-nunito">
				#3DFGiLkNbG2345/[700]
			</h1>
			<div class="w-[40%] flex justify-center items-center relative">
				<div class="h-full w-[70%] py-10 absolute z-10">
					<img
						src="/images/cinema.jpeg"
						alt="cinema-ticket"
						class="object-cover h-full rounded-tl-3xl rounded-br-3xl" />
				</div>
				<div
					class="h-[80%] translate-x-8 w-[70%] py-10 bg-[#f8f4f1] rounded-tr-3xl rounded-bl-3xl mt-10" />
			</div>
			<div
				class="w-[60%] flex flex-col items-center justify-center space-y-4">
				<h1 class="font-berkshire text-5xl text-[#bf6f33]">
					Man of Steel
				</h1>
				<div
					class="flex space-y-1 flex-col justify-center border-t-2 border-t-[#bf6f33] w-full text-center pt-2">
					<h1
						class="text-[#6c1b1a] font-roboto text-4xl tracking-wide inline-flex flex-col uppercase">
						Movie Ticket for
						<span class="text-3xl underline underline-offset-2"
							>Bikathi Martin</span
						>
					</h1>
					<h2
						class="text-[#6c1b1a] font-roboto text-2xl tracking-wide uppercase">
						Streaming: June 29<sup>th</sup> 2023
					</h2>
					<h3
						class="text-[#6c1b1a] font-roboto text-2xl tracking-wide uppercase">
						Time: 10:00 AM - 01:30 AM
					</h3>
					<h4
						class="text-[#6c1b1a] font-roboto text-xl tracking-wide inline-flex flex-col uppercase">
						Location: Kisumu Cinemax
					</h4>
				</div>
			</div>
		</div>

		<button
			type="button"
			@click="saveAsPNG"
			class="bg-purple-600 font-nunito p-2 px-3 text-white rounded-full inline-flex items-center justify-center text-lg w-fit">
			Download Ticket
		</button>
	</div>
</template>
