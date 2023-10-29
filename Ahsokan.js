var breakfast = [
	'[Кейн] Здравствуйте.', 
    '[Губернатор] Привет, Кейн, знакомся. Вон там сидит Асокан, мой давний друг и сослуживец. Асокан - это Кейн, известный детектив',
	'[Асокан] Рад знакомству, Кейн, я наслышан о вашей деятельности.',
	'[Губернатор] Как спалось?',
	'[Кейн] Всё хорошо - спал беспробудно.',
	'[Губернатор] Ну тогда, давайте садиться за стол - будем завтракать.',
	]
   
function init(event){
	event.npc.getAi().setAnimation(1)
	var world = event.npc.getWorld()
}
  
function interact(event){
    var world = event.npc.getWorld()
	var npc = event.npc
    var player = event.player
    var dialogControl = world.getStoreddata().get('dialogControl')
	var dialogNumber = world.getStoreddata().get('dialogNumber')
	switch(dialogControl) {
		case 'breakfast':
			if (dialogNumber < breakfast.length){
				player.message(breakfast[dialogNumber])
				world.getStoreddata().put('dialogNumber', dialogNumber + 1)
				if (dialogNumber == breakfast.length - 1) {
					world.getStoreddata().put('dialogControl', '')
					world.getStoreddata().put('dialogNumber', 0)
					if (!player.hasActiveQuest(1))
						player.startQuest(1)
				}
			}
			break;
	}
}