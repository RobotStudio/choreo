package transceiver

import (
	"fmt"

	"github.com/RobotStudio/choreo/msg"
)

func send(tpc string) {
	addrs := []string{"127.0.0.1:4150"}
	p, err := msg.NewPublisher(tpc, &addrs)
	if err != nil {
		fmt.Println(err)
		panic("Failed to initialize a new publisher")
	}

	data := make(chan []byte)
	go p.Run(data)

	go func() {
		for i := 0; i < 10; i++ {
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

func receiver() {
	addrs := []string{"127.0.0.1:4150"}
	s, err := msg.NewSubscriber("testthis", "testch", &addrs)
	if err != nil {
		fmt.Println(err)
		panic("Failed to initialize a new subscriber")
	}

	select {
	case d := <-s.Data:
		fmt.Println(fmt.Sprintf("Data: %s", d))
	case <-s.StopChan:
		s.Stop()
	case <-s.TermChan:
		s.Stop()
	}

	return
}
