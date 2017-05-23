package msg

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/nsqio/go-nsq"
)

type Subscriber struct {
	nsqds map[string]*nsq.Consumer
	topic string

	stopChan chan bool
	termChan chan os.Signal
}

type Handler struct {
	callback func(string) error
}

func NewMessageHanlder(f func(string) error) {

}

func NewSubscriber(tpc, ch string, addrs []string) (*Subscriber, error) {
	cfg := nsq.NewConfig()
	nc, err := nsq.NewConsumer(t, c, cfg)
	if err != nil {
		return nil, fmt.Errorf("Could not create NewConsumer")
	}

	nc.AddHandler(

	s := &Subscriber{nsqds: nsqds, topic: tpc, channel: ch, stopChan: make(chan bool), termChan: make(chan os.Signal)}
	signal.Notify(s.termChan, syscall.SIGHUP, syscall.SIGINT, syscall.SIGTERM)

	return p, nil
}

func (p *Publisher) Run(data chan []byte) {
	go func() {
		for {
			select {
			case d := <-data:
				go func() {
					for _, pd := range p.nsqds {
						pd.Publish(p.topic, d)
					}
				}()
			case <-p.stopChan:
				p.Stop()
			case <-p.termChan:
				p.Stop()
			}
		}
	}()
}

func (p *Publisher) Stop() {
	for _, pd := range p.nsqds {
		pd.Stop()
	}
}
