package msg

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/nsqio/go-nsq"
)

type Subscriber struct {
	C       *nsq.Consumer
	topic   string
	channel string

	Data     chan []byte
	StopChan chan bool
	TermChan chan os.Signal
}

func (s *Subscriber) HandleMessage(m *nsq.Message) error {
	s.Data <- m.Body
	return nil
}

func NewSubscriber(tpc, ch string, addrs *[]string) (*Subscriber, error) {
	cfg := nsq.NewConfig()
	nc, err := nsq.NewConsumer(tpc, ch, cfg)
	if err != nil {
		return nil, fmt.Errorf("Could not create NewConsumer")
	}

	s := &Subscriber{
		C:        nc,
		topic:    tpc,
		channel:  ch,
		Data:     make(chan []byte),
		StopChan: make(chan bool),
		TermChan: make(chan os.Signal),
	}
	signal.Notify(s.TermChan, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM)

	nc.AddHandler(s)

	return s, nil
}

func (s *Subscriber) Stop() {
	s.C.Stop()
	close(s.Data)
	return
}
