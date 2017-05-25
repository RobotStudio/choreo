package main

import (
	"fmt"

	"github.com/RobotStudio/choreo/msg"
)

func main() {
	addrs := []string{"127.0.0.1:4150"}
	p, err := msg.NewPublisher("testthis", &addrs)
	if err != nil {
		fmt.Println(err)
		panic("Failed to initialize a new publisher")
	}

	data := make(chan []byte)
	go p.Run(data)

	go func() {
		for i := 0; i < 100; i++ {
			data <- []byte(fmt.Sprintf("%d asdf", i))
		}
		close(data)
	}()

	select {
	case <-p.StopChan:
		p.Stop()
	case <-p.TermChan:
		p.Stop()
	}
}
