package main

//go:generate ./regen.sh

import (
  "log"

  "golang.org/x/net/context"
  "google.golang.org/grpc"
  "github.com/RobotStudio/choreo-svc/svc"
)

const (
  address = "localhost:5001"
  defaultValue = true
)

func main() {
  conn, err := grpc.Dial(address, grpc.WithInsecure())
  if err != nil {
    log.Fatalf("did not connect: %v", err)
  }
  defer conn.Close()
  c := svc.NewPingClient(conn)
  val := defaultValue

  r, err := c.Ping(context.Background(), &svc.PingClient{data: val})
  if err != nil {
    log.Fatalf("could not ping: %v", err)
  }
  log.Println(r)
}
