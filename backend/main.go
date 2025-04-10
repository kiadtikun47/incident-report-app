package main

import (
	"time"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

// Incident model
type Incident struct {
	ID          uint      `json:"id" gorm:"primaryKey"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Category    string    `json:"category"`
	Status      string    `json:"status"`
	CreatedAt   time.Time `json:"created_at"`
}

type IncidentInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Category    string `json:"category"`
	Status      string `json:"status"`
}

var db *gorm.DB

func main() {
	var err error
	db, err = gorm.Open(sqlite.Open("incidents.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	db.AutoMigrate(&Incident{})

	router := gin.Default()

	router.Use(cors.Default())

	router.GET("/incidents", getIncidents)
	router.POST("/incidents", createIncident)
	router.PUT("/incidents/:id", updateIncident)
	router.DELETE("/incidents/:id", deleteIncident)

	router.Run(":8080")
}

func getIncidents(c *gin.Context) {
	var incidents []Incident
	db.Find(&incidents)
	c.JSON(http.StatusOK, incidents)
}

func createIncident(c *gin.Context) {
	var input IncidentInput
	if err := c.BindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	incident := Incident{
		Title:       input.Title,
		Description: input.Description,
		Category:    input.Category,
		Status:      input.Status,
		CreatedAt:   time.Now(),
	}

	db.Create(&incident)
	c.JSON(http.StatusOK, incident)
}

func updateIncident(c *gin.Context) {
	id := c.Param("id")
	var incident Incident

	if err := db.First(&incident, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Incident not found"})
		return
	}
	var input IncidentInput
	if err := c.BindJSON(&input); err != nil{
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	incident.Title = input.Title
	incident.Description = input.Description
	incident.Category = input.Category
	incident.Status = input.Status

	db.Save(&incident)
	c.JSON(http.StatusOK, incident)
}

func deleteIncident(c *gin.Context) {
	id := c.Param("id")
	var incident Incident

	if err := db.First(&incident, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Incident not found"})
		return
	}

	db.Delete(&incident)
	resetAutoIncrement()
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successfully"})
}

func resetAutoIncrement() {
	db.Exec("DELETE FROM sqlite_sequence WHERE name='incidents'")
}
