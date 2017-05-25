package msg

import (
	"fmt"
	"os"
	"os/signal"
	"sync"
	"syscall"

	"github.com/nsqio/go-nsq"
)

type Subscriber struct {
	C       *nsq.Consumer
	topic   string
	channel string

	Data chan []byte

	StopChan chan bool
	termChan chan os.Signal
}

type Handler struct {
	S *Subscriber
}

func (h *Handler) HandleMessage(m *nsq.Message) {
	h.S.Data <- m.Body
}

func NewSubscriber(tpc, ch string, addrs []string) (*Subscriber, error) {
	cfg := nsq.NewConfig()
	nc, err := nsq.NewConsumer(tpc, ch, cfg)
	if err != nil {
		return nil, fmt.Errorf("Could not create NewConsumer")
	}

	s := &Subscriber{C: nc, topic: tpc, channel: ch, StopChan: make(chan bool), termChan: make(chan os.Signal)}
	signal.Notify(s.termChan, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM)

	return s, nil
}

func (s *Subscriber) Run() {
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		for {
			select {
			case <-s.StopChan:
				s.Stop()
			case <-s.termChan:
				s.Stop()
			}
		}
		wg.Done()
	}()
}

func (s *Subscriber) Stop() {
	s.C.Stop()
	close(s.Data)
}
