function tick(event){
	var player = event.player
	var world = event.player.getWorld()
	var dialogControl = world.getStoreddata().get('dialogControl')
	if(player.inWater() && dialogControl == 'Roalvi'){
		player.setPosition(-569.5, 31, -495.5)
	}
}