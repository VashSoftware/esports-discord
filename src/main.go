package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"

	"github.com/bwmarrin/discordgo"
	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	discord, err := discordgo.New("Bot " + os.Getenv("DISCORD_TOKEN"))
	if err != nil {
		log.Fatal(err)
	}

	discord.AddHandler(func(s *discordgo.Session, r *discordgo.Ready) {
		fmt.Printf("Bot is running as %s\n", r.User.Username)
	})

	discord.AddHandler(func(s *discordgo.Session, i *discordgo.InteractionCreate) {
		data := i.ApplicationCommandData()
		switch data.Name {
		case "queue":
			err := s.InteractionRespond(i.Interaction, &discordgo.InteractionResponse{
				Type: discordgo.InteractionResponseChannelMessageWithSource,
				Data: &discordgo.InteractionResponseData{
					Content: "You have joined the queue!",
				},
			})
			if err != nil {
				log.Fatal(err)
			}
		}
	})

	registerCommands(discord)

	err = discord.Open()
	if err != nil {
		log.Fatal(err)
	}

	sigch := make(chan os.Signal, 1)
	signal.Notify(sigch, os.Interrupt)
	<-sigch

	discord.Close()
}

func registerCommands(discord *discordgo.Session) {
	_, err := discord.ApplicationCommandBulkOverwrite(
		os.Getenv("DISCORD_APPLICATION_ID"),
		os.Getenv("DISCORD_GUILD_ID"),
		[]*discordgo.ApplicationCommand{
			{
				Name:        "queue",
				Description: "Join the quick queue.",
			},
		})
	if err != nil {
		log.Fatal(err)
	}
}
