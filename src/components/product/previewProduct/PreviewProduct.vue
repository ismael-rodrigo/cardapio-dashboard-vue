<template>
<div class="container">
	<div class="container-infos">
		<div class="infos">
			<h3>
				{{product.title}}
			</h3>

			<h4>
				{{product.description}}
			</h4>

			<h4>
				R$ {{product.value}}
			</h4>
		</div>
		<div>
			<img :src="product.icon" class="image" >
		</div>
	</div>

	<div class="requirements">
		<div v-for="requirement in product.requirements" :key="requirement.name"  >
			<div class="title-requirement">
				<p>{{requirement.name}}</p>
				<div>
					<p>{{requirement.length_sub_requiments.min}} até {{requirement.length_sub_requiments.max}} </p>
				</div>
			</div>

			<div v-for="sub in requirement.sub_requirements" :key="sub.name" >
				<div class="sub-requirement">
					<div>
						<h5>{{sub.name}}</h5>
						<h6>{{sub.description}}</h6>
					</div>
					<div>
						<p>R$ {{sub.value}}</p>
					</div>
				</div>
        <q-separator/>
			</div>


		</div>


	</div>


</div>
</template>


<script setup lang="ts">
const product = {
				"_id": "62fda418d9f33974e9ee2b00",
				"title": "PIZZA PEQUENA",
				"description": "PIZZA PEQUENA com varios sabores variados de PIZZA ",
				"value": 24.0,
				"icon": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0mYuIdUSHgKO4sSOTlzbYs1xSvgrAEqov5g&usqp=CAU",
				"requirements": [
					{
						"name": "Escolha um sabor",
						"length_sub_requiments": {
							"min": 2,
							"max": 2
						},
						"sub_requirements": [
							{
								"name": "calabresa",
								"description": "molho especial",
								"value": 12.0,
								"id": "ac6f1c1f-5f0e-466c-b5d4-72b26ba1f0e2"
							},
							{
								"name": "mussarela",
								"description": "molho especial",
								"value": 12.0,
								"id": "0cc647bf-f610-466d-a776-dee37df9a63d"
							}
						]
					},
					{
						"name": "Adicional",
						"length_sub_requiments": {
							"min": 0,
							"max": 5
						},
						"sub_requirements": [
							{
								"name": "Ketchup",
								"description": "molho especial",
								"value": 5.0,
								"id": "36c00311-27b2-45da-add0-27835c18a068"
							},
							{
								"name": "Maionese",
								"description": "molho especial",
								"value": 2.0,
								"id": "4f4f639d-d497-43e0-833b-0f6b768d3dfe"
							}
						]
					}
				],
				"group_name": "PIZZA"
			}


</script>

<style scoped>
.image{
	border-radius: 5px;
}


.container-infos{
	width: 100%;
	display: flex;
	justify-content: space-between;
	padding: 5px;
  padding-left: 10px;
}
.container{
	background-color: rgb(155, 155, 155);

	padding: 0px;
	margin: 50px;
	border-radius: 5px;
	color: black;

	display: flex;
	flex-direction: column;
}


.infos h3{
	font-size: x-large;
	margin: 0px;
	padding: 0px;
}

.infos h4{
	font-size: medium;
	margin: 0px;
	padding: 0px;
}


.title-requirement{
	padding: 8px;
	display: flex;
	justify-content: space-between;
	background-color: rgb(141, 141, 141);

}
.sub-requirement{
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 9px;

}
.sub-requirement h5 {
	margin: 0px;
	padding: 0px;
	font-size: larger;
	font-weight: 600;
}

.sub-requirement h6 {
	margin: 0px;
	padding: 0px;
	font-size: medium;
	font-weight: 400;
}


</style>
