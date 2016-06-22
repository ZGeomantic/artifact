package main

import (
	"fmt"
	"time"
)

var (
	command string
)

// 假设某个服务中有两种类型的任务:
// 第一种任务是RoutineJob， 作为后台服务运行，需要一直在某个协程中运行。
// 另一种任务是PrioJob，由某个事件触发，但是一旦执行就需要RoutineJob暂停运行，直到其执行完毕才能恢复。
func ABJobDemo() {
	job := NewAbJob()
	go func() {
		for {
			fmt.Println("Do you want to start PrioJob(y/n) ")
			fmt.Scanln(&command)

			fmt.Printf("command: %s\n", command)
			if command == "y" {
				job.PrioJob()
			} else {
				fmt.Println("不处理")
			}

		}

	}()
	job.RoutineJob()
}

type ABJob struct {
	PrioStart chan int
	PrioEnd   chan int
}

func NewAbJob() ABJob {
	return ABJob{
		PrioStart: make(chan int),
		PrioEnd:   make(chan int),
	}
}

// 日常的工作协程，一直运行在后台，会被优先协程打断，一直到优先协程执行完毕
func (this *ABJob) RoutineJob() {
	for {
		select {
		case <-this.PrioStart:
			<-this.PrioEnd
		default:
			fmt.Printf("当前时间:%s\n", time.Now())
			time.Sleep(time.Second * 1)
		}

	}
}

// 优先协程，一旦启动，日常的协程必须立刻停止。
func (this *ABJob) PrioJob() {
	sig := 1
	this.PrioStart <- sig

	fmt.Println("优先任务开始")
	time.Sleep(time.Second * 3)
	fmt.Println("优先任务结束")

	this.PrioEnd <- sig

}
