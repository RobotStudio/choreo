package msg

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"

	"github.com/nsqio/go-nsq"
)

type Publisher struct {
	producers map[string]*nsq.Producer
	topic     string

	stopChan chan bool
	termChan chan os.Signal
}

func NewPublisher(tpc string, addrs []string) (*Publisher, error) {
	cfg := nsq.NewConfig()
	producers := make(map[string]*nsq.Producer)
	for _, p := range addrs {
		np, err := nsq.NewProducer(p, cfg)
		if err != nil {
			return nil, fmt.Errorf("Could not create NewProducer")
		}
		producers[p] = np
	}

	p := &Publisher{producers: producers, topic: tpc, stopChan: make(chan bool), termChan: make(chan os.Signal)}
	signal.Notify(p.termChan, syscall.SIGINT, syscall.SIGTERM)

	return p, nil
}

func (p *Publisher) Run(data chan []byte) {
	go func() {
		for {
			select {
			case d := <-data:
				go func() {
					for _, pd := range p.producers {
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
	for _, pd := range p.producers {
		pd.Stop()
	}
}
