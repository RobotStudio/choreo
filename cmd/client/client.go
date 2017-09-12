package main

//go:generate ../../regen.sh

import (
  "log"

  "golang.org/x/net/context"
  "google.golang.org/grpc"
  "github.com/RobotStudio/choreo-svc/svc"
  msg "github.com/RobotStudio/choreo-msg/msg/primitive"
)

const (
  address = "localhost:5001"
  defaultValue = false
)

func main() {
  conn, err := grpc.Dial(address, grpc.WithInsecure())
  if err != nil {
    log.Fatalf("did not connect: %v", err)
  }
  defer conn.Close()
  c := svc.NewPingClient(conn)
  val := defaultValue

  r, err := c.Ping(context.Background(), &msg.Bool{Data: val})
  if err != nil {
    log.Fatalf("could not ping: %v", err)
  }

  if r.Data {
    log.Println("True")
  } else {
    log.Println("False")
  }
}
