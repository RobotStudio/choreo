package msg

import (
	"errors"
	"os"
	"os/signal"
	"syscall"

	"github.com/nsqio/go-nsq"
)

type Publisher struct {
	producers map[string]*nsq.Producer
	topic     string

	Data     chan []byte
	StopChan chan bool
	TermChan chan os.Signal
}

func NewPublisher(tpc string, addrs *[]string) (*Publisher, error) {
	cfg := nsq.NewConfig()
	prdcrs := make(map[string]*nsq.Producer)
	for _, p := range *addrs {
		np, err := nsq.NewProducer(p, cfg)
		if err != nil {
			return nil, errors.New("Could not create NewProducer")
		}
		prdcrs[p] = np
	}

	p := &Publisher{
		producers: prdcrs,
		topic:     tpc,
		StopChan:  make(chan bool),
		TermChan:  make(chan os.Signal),
	}
	signal.Notify(p.TermChan, syscall.SIGINT, syscall.SIGTERM)

	return p, nil
}

func (p *Publisher) Run(data chan []byte) {
	for {
		d, ok := <-data
		if !ok {
			close(p.StopChan)
			break
		}
		for _, pd := range p.producers {
			pd.Publish(p.topic, d)
		}
	}
}

func (p *Publisher) Stop() {
	for _, pd := range p.producers {
		pd.Stop()
	}
}
