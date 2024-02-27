addLayer("dev", {
    name: "dev",
    symbol: "DEV",
    color: "white",
    row: "side",
    tooltip() {
        return "for test, shouldn't be show ingame"
    },
    hotkeys: [
        {key: "0", description: "0% dev speed", onPress(){player.devSpeed = new Decimal(0)}},
        {key: "1", description: "100% dev speed", onPress(){player.devSpeed = new Decimal(1)}},
        {key: "2", description: "1000% dev speed", onPress(){player.devSpeed = new Decimal(10)}},
    ],
    tabFormat: {
        "Points": {
            content: [

            ]
        },
        "Times": {
            content: [

            ]
        },
        "Tickspeed": {
            content: [
                    ["clickables", [1]]
            ]
        },
        "Savebank": {
            content: [
                    ["clickables", [10]]
            ]
        },
        "Fix bugs": {
            content: [
                ["display-text", function() {return "<h2>Maybe you can fix bugs here</h2>"}],
                ["blank"],
                ["blank"],
                ["clickables", [20]]
            ]
        }
    },
    clickables: {
        11: {
            title: "Set devSpeed to <br><font size = +1>0%</font>",
            canClick: true,
            onClick() {
                player.devSpeed = new Decimal(0)
            }
        },
        12: {
            title: "Set devSpeed to <br><font size = +1>100%</font>",
            canClick: true,
            onClick() {
                player.devSpeed = new Decimal(1)
            }
        },
        13: {
            title: "Set devSpeed to <br><font size = +1>1000%</font>",
            canClick: true,
            onClick() {
                player.devSpeed= new Decimal(10)
            }
        },
        14: {
            title: "Set devSpeed to <br><font size = +1>10000%</font>",
            canClick: true,
            onClick() {
                player.devSpeed= new Decimal(100)
            }
        },
        15: {
            title: "Set devSpeed to <br><font size = +1>100000%</font>",
            canClick: true,
            onClick() {
                player.devSpeed= new Decimal(1000)
            }
        },
        101: {
            title: "Kawaii Layer start",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcwNzI5MTkyNDcwMCwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJUUlQiLCJ2ZXJzaW9uIjoiMS4wIiwidGltZVBsYXllZCI6MjMwLjM0MDY0Mzk3OTQ0Njg0LCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJwb2ludHMiOiIxOTgyMi4zNTExNTE5ODg2OCIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sInN0YXQiOnsibWFpblRhYnMiOiJJbmZvcyJ9LCJ0aXAiOnsibWFpblRhYnMiOiJNYWluIn0sImRldiI6eyJtYWluVGFicyI6IlNhdmViYW5rIn0sInQiOnsiVXBncmFkZXMiOiJSZXNldFRpbWVzIn19LCJsYXN0U2FmZVRhYiI6ImsiLCJpbmZvYm94ZXMiOnsic3RhdCI6eyJpbmZvcyI6ZmFsc2UsInB0VG90YWwiOmZhbHNlLCJwdEgiOmZhbHNlLCJydFRvdGFsIjpmYWxzZSwiaFRvdGFsIjpmYWxzZSwiaEgiOmZhbHNlLCJoSyI6ZmFsc2V9LCJ0aXAiOnsibWFpbiI6ZmFsc2V9fSwiaW5mby10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMzAuMzQwNjQzOTc5NDQ2ODQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMzAuMzQwNjQzOTc5NDQ2ODQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjIzMC4zNDA2NDM5Nzk0NDY4NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJibGFuayI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjIzMC4zNDA2NDM5Nzk0NDY4NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjIzMC4zNDA2NDM5Nzk0NDY4NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJoIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI5MSIsInRvdGFsIjoiNjMwIiwiYmVzdCI6IjMxMyIsInJlc2V0VGltZSI6MTI1LjkwNDY0Mzk3OTQ0NDYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDIxLDIyLDIzLDI0LDMxXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJrIjp7InBvaW50cyI6IjAiLCJiZXN0IjoiMCIsInRvdGFsIjoiMCIsInVubG9ja2VkIjp0cnVlLCJyZXNldFRpbWUiOjIzMC4zNDA2NDM5Nzk0NDY4NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzdGF0Ijp7InBvaW50cyI6IjAiLCJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjIzMC4zNDA2NDM5Nzk0NDY4NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0aXAiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoyMzAuMzQwNjQzOTc5NDQ2ODQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZGV2Ijp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MjMwLjM0MDY0Mzk3OTQ0Njg0LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMTQiOiIiLCIxMDEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIyMzAuMzQxNjQzOTc5NDQ2ODEiLCJwdCI6IjIzMC4zNDE2NDM5Nzk0NDY4MSIsInN0IjoiNy40OTk5OTk5OTk5OTk5OTciLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMjMwLjM0MTY0Mzk3OTQ0NjgxIiwicmVzZXRUaW1lIjoyMzAuMzQwNjQzOTc5NDQ2ODQsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYSI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjIzMC4zNDA2NDM5Nzk0NDY4NCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9fQ==");
            }
        },
        102: {
            title: "3 k-chall done",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcwNzk3NDEwMTMzMywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJUUlQiLCJ2ZXJzaW9uIjoiMC4wLmluRGV2IiwidGltZVBsYXllZCI6NDYyOS45MDY2MjAxNDQ3NSwia2VlcEdvaW5nIjpmYWxzZSwiaGFzTmFOIjpmYWxzZSwicG9pbnRzIjoiMCIsInN1YnRhYnMiOnsiY2hhbmdlbG9nLXRhYiI6e30sInQiOnsiVXBncmFkZXMiOiJSZXNldFRpbWVzIn0sInN0YXQiOnsibWFpblRhYnMiOiJBdG9tcyJ9LCJ0aXAiOnsibWFpblRhYnMiOiJGaXggYnVncyJ9LCJkZXYiOnsibWFpblRhYnMiOiJUaWNrc3BlZWQifX0sImxhc3RTYWZlVGFiIjoiaCIsImluZm9ib3hlcyI6eyJzdGF0Ijp7ImluZm9zIjpmYWxzZSwicHRUb3RhbCI6ZmFsc2UsInB0VCI6ZmFsc2UsInB0SCI6ZmFsc2UsInB0SyI6ZmFsc2UsInJ0VG90YWwiOmZhbHNlLCJoVG90YWwiOmZhbHNlLCJoSCI6ZmFsc2UsImhLIjpmYWxzZSwicnRUIjpmYWxzZSwicnRIIjpmYWxzZX0sInRpcCI6eyJtYWluIjpmYWxzZX19LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQ2MjkuOTA2NjIwMTQ0NzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0NjI5LjkwNjYyMDE0NDc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImNoYW5nZWxvZy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo0NjI5LjkwNjYyMDE0NDc1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDYyOS45MDY2MjAxNDQ3NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQ2MjkuOTA2NjIwMTQ0NzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiaCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInRvdGFsIjoiMTk1NiIsImJlc3QiOiIxNzE3IiwicmVzZXRUaW1lIjoyMDg2LjY4MzU2ODE2OTU3MSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMjEsMjIsMjMsMjQsMzFdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImsiOnsicG9pbnRzIjoiMCIsImJlc3QiOiIzIiwidG90YWwiOiIzIiwidW5sb2NrZWQiOnRydWUsInJlc2V0VGltZSI6MjEyNy44ODE1NjgxNjk1NzEsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEwMSwxMDJdLCJtaWxlc3RvbmVzIjpbIjAiLCIxIiwiMiJdLCJsYXN0TWlsZXN0b25lIjoiMiIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnsiMTEiOjEsIjEyIjoxLCIxMyI6MX0sImdyaWQiOnt9LCJwcmV2VGFiIjoiIiwiYWN0aXZlQ2hhbGxlbmdlIjpudWxsfSwidCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMCIsInB0IjoiNDYyOS45MDc2MjAxNDQ3NDkiLCJzdCI6IjAiLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMzczNS4xMzM1ODIxNTg5NzciLCJyZXNldFRpbWUiOjQ2MjkuOTA2NjIwMTQ0NzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExXSwibWlsZXN0b25lcyI6WyIwIiwiMSJdLCJsYXN0TWlsZXN0b25lIjoiMSIsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDYyOS45MDY2MjAxNDQ3NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiLCIxNCIsIjE1Il0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzdGF0Ijp7InBvaW50cyI6IjAiLCJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjQ2MjkuOTA2NjIwMTQ0NzUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidGlwIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDYyOS45MDY2MjAxNDQ3NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIxMyI6IiIsIjE0IjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZGV2Ijp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NDYyOS45MDY2MjAxNDQ3NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIxMyI6IiIsIjE0IjoiIiwiMTUiOiIiLCIxMDEiOiIiLCIxMDIiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJkZXZTcGVlZCI6IjAifQ==");
            }
        },
        103: {
            title: "4 k-chall done",
            canClick: true,
            onClick() {
                if (!confirm("Your current progress will not be saved!")) return;
                importSave("eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTcwODIzOTAwNjk3NSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJUUlQiLCJ2ZXJzaW9uIjoiMC4wLmluRGV2IiwidGltZVBsYXllZCI6MTk1OC4yNTI5OTk5OTg5MzIyLCJrZWVwR29pbmciOmZhbHNlLCJoYXNOYU4iOmZhbHNlLCJwb2ludHMiOiIyMDIzNzczLjMxNzg4MTkwNDUiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJoIjp7IlRpZXJzIjoiVGllciAxIn0sInQiOnsiVXBncmFkZXMiOiJSZXNldFRpbWVzIn0sInN0YXQiOnsibWFpblRhYnMiOiJIaSJ9LCJ0aXAiOnsibWFpblRhYnMiOiJNYWluIn0sImRldiI6eyJtYWluVGFicyI6IlNhdmViYW5rIn19LCJsYXN0U2FmZVRhYiI6ImgiLCJpbmZvYm94ZXMiOnsic3RhdCI6eyJpbmZvcyI6ZmFsc2UsInB0VG90YWwiOmZhbHNlLCJwdFQiOmZhbHNlLCJwdEgiOmZhbHNlLCJwdEsiOmZhbHNlLCJydFRvdGFsIjpmYWxzZSwicnRUIjpmYWxzZSwicnRIIjpmYWxzZSwicnRLIjpmYWxzZSwiaFRvdGFsIjpmYWxzZSwiaEgiOmZhbHNlLCJoSyI6ZmFsc2UsImtUb3RhbCI6ZmFsc2UsImtLIjpmYWxzZX0sInRpcCI6eyJtYWluIjpmYWxzZX19LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE5NTguMjUyOTk5OTk4OTMyMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJvcHRpb25zLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE5NTguMjUyOTk5OTk4OTMyMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTk1OC4yNTI5OTk5OTg5MzIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTk1OC4yNTI5OTk5OTg5MzIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInRyZWUtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTk1OC4yNTI5OTk5OTg5MzIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImgiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjEyMjA0NiIsInRvdGFsIjoiMTIyMjg1IiwiYmVzdCI6IjEyMjIyNiIsInJlc2V0VGltZSI6MS40MDAwMDAwMDAwMDAwMDAxLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIifSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTQsMjEsMjIsMjMsMjRdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImsiOnsicG9pbnRzIjoiNSIsImJlc3QiOiI1IiwidG90YWwiOiIyMCIsInVubG9ja2VkIjp0cnVlLCJyZXNldFRpbWUiOjYuNjQ5OTk5OTk5OTk5OTk5NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEwMSwxMDIsMTIsMTMsMTQsMTVdLCJtaWxlc3RvbmVzIjpbIjAiLCIxIiwiMiIsIjMiXSwibGFzdE1pbGVzdG9uZSI6IjMiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7IjExIjoxLCIxMiI6MSwiMTMiOjEsIjE0IjoxfSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJ0Ijp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxNDQ4Ny4zOTY0NDI2MjI5MTgiLCJwdCI6IjE5NTguMjUzOTk5OTk4OTMyMiIsInN0IjoiMjIuMTUwMDAwMDAwMDAwMDM4IiwidG90YWwiOiIwIiwiYmVzdCI6IjE0NDg3LjM5NjQ0MjYyMjkxOCIsInJlc2V0VGltZSI6MTk1OC4yNTI5OTk5OTg5MzIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMV0sIm1pbGVzdG9uZXMiOlsiMCIsIjEiXSwibGFzdE1pbGVzdG9uZSI6IjEiLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYSI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE5NTguMjUyOTk5OTk4OTMyMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6WyIxMSIsIjEyIiwiMTMiLCIxNCIsIjE1Il0sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzdGF0Ijp7InBvaW50cyI6IjAiLCJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE5NTguMjUyOTk5OTk4OTMyMiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0aXAiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxOTU4LjI1Mjk5OTk5ODkzMjIsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiZGV2Ijp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTk1OC4yNTI5OTk5OTg5MzIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIiwiMTQiOiIiLCIxNSI6IiIsIjEwMSI6IiIsIjEwMiI6IiIsIjEwMyI6IiIsIjIwMSI6IiIsIjIwMiI6IiIsIjIwMyI6IiIsIjIwNCI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm0iOnsicG9pbnRzIjoiMCIsInBpY2tUaWVyIjoiMCIsInN0b25lIjoiMCIsInRpbiI6IjAiLCJjb2FsIjoiMCIsImlyb24iOiIwIiwiZ29sZCI6IjAiLCJqYWRlIjoiMCIsImRpYW1vbmQiOiIwIiwiZGRhcnJlaXNtIjoiMCIsInVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTk1OC4yNTI5OTk5OTg5MzIyLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImRldlNwZWVkIjoiMCJ9");
            }
        },
        201: {
            title: "Reset Atoms to 0",
            canClick: true,
            onClick() {
                player.points = new Decimal(0)
            }
        },
        202: {
            title: "Reset rt to tt",
            canClick: true,
            onClick() {
                player.t.points = player.t.pt
            }
        },
        203: {
            title: "Reset Hi to 0",
            canClick: true,
            onClick() {
                player.h.points = new Decimal(0)
            }
        },
        204: {
            title: "Reset Kawaii to 3",
            canClick: true,
            onClick() {
                player.k.points = new Decimal(3)
            },
            unlocked() {return player.k.best.gte(3)}
        },
    }
})