# Definisci i nomi dei container
FE = flowjs-frontend-1
BE = flowjs-flask_server-1
DB = mongodb

# Avvia i container in background
up:
	docker-compose up -d

# Ferma e rimuove i container
down:
	docker-compose down

# Ferma, rimuove i container e cancella i volumi
down-serious:
	docker-compose down --volumes

# Mostra i container in esecuzione
ps:
	docker ps

# Mostra i log di un container (es. make logs container=FE)
logs:
	@if [ "$(container)" = "FE" ]; then \
		docker logs -f $(FE); \
	elif [ "$(container)" = "BE" ]; then \
		docker logs -f $(BE); \
	elif [ "$(container)" = "DB" ]; then \
		docker logs -f $(DB); \
	else \
		echo "Invalid container name. Please choose from FE, BE, DB."; \
		exit 1; \
	fi

# Riavvia un container (es. make restart container=FE)
restart:
	@if [ "$(container)" = "FE" ]; then \
		docker restart $(FE); \
	elif [ "$(container)" = "BE" ]; then \
		docker restart $(BE); \
	elif [ "$(container)" = "DB" ]; then \
		docker restart $(DB); \
	else \
		echo "Invalid container name. Please choose from FE, BE, DB."; \
		exit 1; \
	fi

# Entra in una shell interattiva del container (es. make sh container=FE)
sh:
	@if [ "$(container)" = "FE" ]; then \
		docker exec -it $(FE) sh; \
	elif [ "$(container)" = "BE" ]; then \
		docker exec -it $(BE) sh; \
	elif [ "$(container)" = "DB" ]; then \
		docker exec -it $(DB) sh; \
	else \
		echo "Invalid container name. Please choose from FE, BE, DB."; \
		exit 1; \
	fi

# Mostra lo stato dei volumi Docker
volumes:
	docker volume ls

# Pulisce i volumi non utilizzati
clean-volumes:
	docker volume prune -f

# Mostra i network Docker
networks:
	docker network ls

# Pulisce i network non utilizzati
clean-networks:
	docker network prune -f
