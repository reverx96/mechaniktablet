display = false
ESX = nil
local PlayerData = {}

local tabletModel = "prop_cs_tablet"
local tabletDict = "amb@world_human_seat_wall_tablet@female@base"
local tabletAnim = "base"

-- load jobData
Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	while ESX.GetPlayerData().job == nil do
		Citizen.Wait(10)
	end

	PlayerData = ESX.GetPlayerData()
end)

-- Animacja tabletu

function startTabletAnimation()
	Citizen.CreateThread(function()
	  RequestAnimDict(tabletDict)
	  while not HasAnimDictLoaded(tabletDict) do
	    Citizen.Wait(0)
	  end
		attachObject()
		TaskPlayAnim(GetPlayerPed(-1), tabletDict, tabletAnim, 8.0, -8.0, -1, 50, 0, false, false, false)
	end)
end

function attachObject()
	if tabletEntity == nil then
		Citizen.Wait(380)
		RequestModel(tabletModel)
		while not HasModelLoaded(tabletModel) do
			Citizen.Wait(1)
		end
		tabletEntity = CreateObject(GetHashKey(tabletModel), 1.0, 1.0, 1.0, 1, 1, 0)
		AttachEntityToEntity(tabletEntity, GetPlayerPed(-1), GetPedBoneIndex(GetPlayerPed(-1), 57005), 0.12, 0.10, -0.13, 25.0, 170.0, 160.0, true, true, false, true, 1, true)
	end
end

function stopTabletAnimation()
	if tabletEntity ~= nil then
		StopAnimTask(GetPlayerPed(-1), tabletDict, tabletAnim ,8.0, -8.0, -1, 50, 0, false, false, false)
		DeleteEntity(tabletEntity)
		tabletEntity = nil
	end
end


--[WYWOŁANIE TABLETU]
RegisterCommand("tab2", function(source, args)
    TriggerEvent('mechanictabletpol')   
end)

RegisterNetEvent('tableton2')
AddEventHandler('tableton2', function()
TriggerEvent('mechanictabletpol')   
end)

--[WYŁĄCZENIE TABLETU]
RegisterNUICallback("exit", function(data)
    SetNuiFocus(false, false)
    stopTabletAnimation()
    SendNUIMessage({
        type = "ui",
        status = false,
    })
end)


RegisterNetEvent('mechanictabletpol')
AddEventHandler('mechanictabletpol', function(data)
    PlayerData = ESX.GetPlayerData()
        if PlayerData.job ~= nil then
            local jobName = PlayerData.job.name
            if jobName == 'mechanic' then
              
            --[WIDOCZNOSC TABLETU] 
                SetNuiFocus(true, true)
                startTabletAnimation() 
                SendNUIMessage({
                    type = "ui",
                    status = true,
                })
        end
    end
end)




--[MOZLIWOSC KORZYSTANIA Z TABLETU]
Citizen.CreateThread(function()
    while display do
        Citizen.Wait(0)

        DisableControlAction(0, 1, display) -- LookLeftRight
        DisableControlAction(0, 2, display) -- LookUpDown
        DisableControlAction(0, 142, display) -- MeleeAttackAlternate
        DisableControlAction(0, 18, display) -- Enter
        DisableControlAction(0, 322, display) -- ESC
        DisableControlAction(0, 106, display) -- VehicleMouseControlOverride
    end
end)

------------------------------------------------------------------------------------------------------ CLIENT WYSTAWIANIE FAKTUR


RegisterNUICallback('mandatMechanik', function(data, cb)
    local sender = GetPlayerServerId(player)
    local PlayerID = tonumber(data.playerid)
    if PlayerData.job.name == 'mechanic' then

            local amm = tonumber(data.mandatamount) / 100
            local playeramm = amm * 30
            local accamm = amm * 65
            local pod = amm * 5
            TriggerServerEvent("projektsantos21:mandatMechanik", PlayerID, tonumber(data.mandatamount), data.mandatreason)
            local tresc = "<br>Na konto Warsztatu trafia: $"..accamm.."<br>Podatek: $"..pod..""
    
            SetNotificationTextEntry("STRING")
            AddTextComponentString(""..tresc.."")
            TriggerEvent('esx:showNotification', tresc)
            DrawNotification_4(false, true)
            Wait(2000)  
            
            -- TriggerServerEvent("projektsantos21:mandathajs", tonumber(data.mandatamount))
    else 
        TriggerEvent('esx:showNotification', 'Po co ci ten nui_devtools? :D')
    end
end)



--[Callback wysłania formularza do bazy danych]
RegisterNUICallback("AddFormMechanic", function(data)

    C1 = data.inputUsluga1
    C2 = data.inputNaprawa1
    C3 = data.inputData1
    C4 = data.inputDane1    
    C5 = data.inputTuning1
    C6 = data.inputUbezpieczenie1
    C7 = data.inputMechanik1
    C8 = data.inputKwota

   if (C1 or C2 or C3 or C4 or C5 or C6 or C7 or C8) ~= nil then
    TriggerServerEvent("AddFormMechanicServer",data)
    local tresc = "Mechanic DataBase".."<br><br>Dodano Rekord do bazy! </br>"
    TriggerEvent('esx:showNotification', tresc)
   end
end)

RegisterNUICallback("SerchKlientMech", function(data)

    C1 = data.inputDaneKlienta

   if C1 ~= nil then
    TriggerServerEvent("ServerSerchKlientMech",data)
   end
end)

RegisterNUICallback("SearchMechanikMech", function(data)

    C1 = data.inputDaneMechanika

   if C1 ~= nil then
    TriggerServerEvent("ServerSearchMechanikMech",data)
   end
end)

RegisterNetEvent("ClientSearchDaneKlienta")
    AddEventHandler("ClientSearchDaneKlienta", function(data)
        Wait(300)
        SendNUIMessage({
            type = "KlientData",
            DataKlient=data;
        })
    end)

    RegisterNetEvent("ClientSearchDaneMechanika")
    AddEventHandler("ClientSearchDaneMechanika", function(data)
        Wait(300)
        SendNUIMessage({
            type = "MechanikData",
            DataMechanik=data;
        })
    end)

    
    RegisterNUICallback("GetKlientNameMech", function(data) 
        local closestPlayer, closestDistance = ESX.Game.GetClosestPlayer()
            if closestPlayer ~= -1 and closestDistance <= 3.0 then
          TriggerServerEvent("GetKlientNameMechServer", GetPlayerServerId(closestPlayer), data)
            end
      end)
      
      RegisterNetEvent("GetKlientNameMechClient") 
      AddEventHandler("GetKlientNameMechClient", function(data)
          PlayerData = ESX.GetPlayerData()
          Wait(300)
          SendNUIMessage({
              type = "GetKlientNameMechClient",
              daneklienta={
                daneklienta = data.danekleinta,
                    };
          })
      end)



    RegisterNUICallback("DaneBazaMenuMech", function(data)
        PlayerData = ESX.GetPlayerData()
      
        while PlayerData.job == nil do
            Citizen.Wait(10)
        end

        while PlayerData.job.name ~= 'mechanic' do
            Citizen.Wait(10)
        end

        if PlayerData.job ~= nil and PlayerData.job.name == 'mechanic' then
            
        jobName1 = PlayerData.job.name
        identifier = PlayerData.identifier

        TriggerServerEvent("DaneBazaMenuMechServer", jobName1, identifier ,data)
        end
        
      end)
      
      RegisterNetEvent("DaneBazaMenuMechClient") 
      AddEventHandler("DaneBazaMenuMechClient", function(data)
          PlayerData = ESX.GetPlayerData()
          Wait(300)
          SendNUIMessage({
              type = "MenuMechanik",
              DaneMenu={
                  jobGrade = PlayerData.job.grade_label,
                  jobName = PlayerData.job.label,
                  mechanikDane = data.mechanikdane,
                  iloscwpisow = data.wynik,
                    };
          })
      end)

      
      RegisterNUICallback("DeleteMechanicData", function(data)

     TriggerServerEvent("DeleteMechanicDataServer", data)
     local tresc = "Mechanic DataBase".."<br><br>Usunięto Rekord z bazy! </br>"
        TriggerEvent('esx:showNotification', tresc)
      end)

      
      RegisterNUICallback("FakturaDataLast", function(data)

        TriggerServerEvent("FakturaDataLastServer", data)
         end)

         RegisterNetEvent("FakturaDataLastClient") 
         AddEventHandler("FakturaDataLastClient", function(data)
             PlayerData = ESX.GetPlayerData()
             Wait(300)
             SendNUIMessage({
                 type = "FakturaData",
                 DataFaktura={
                     danemechanikafaktura = data.mechanikdaneS,
                     kwotafaktura = data.kwotadozaplaty,
                       };
             })
         end)

         RegisterNUICallback("SearchLastMech", function(data)
            CInputSearchLast11 = data.InputSearchLast1Mech
        
            if CInputSearchLast11 ~= nil then
            TriggerServerEvent("SearchLastMechServer",data)
            Wait(300)
            end
        end)
        
        --[Event do JS aby wysłać dane z bazy]
        RegisterNetEvent("SearchLastMechClient")
            AddEventHandler("SearchLastMechClient", function(data)
        
                Wait(300)
                SendNUIMessage({
                    type = "SearchLastMechClient",
                    DataBaseLastMech=data;
                })
            end)


            RegisterNUICallback("StatsMech1", function(data)
                TriggerServerEvent("Stats1ServerMech",data)
                Wait(300)
            end)
        
            RegisterNetEvent("Stats1ClientMech") 
            AddEventHandler("Stats1ClientMech", function(data)
                Wait(300)
                SendNUIMessage({
                    type = "Stats1m",
                    Stats1m=data;
                })
            end)
        
            RegisterNUICallback("StatsMech2", function(data)
                TriggerServerEvent("Stats2ServerMech",data)
                Wait(300)
            end)
            RegisterNetEvent("Stats2ClientMech") 
            AddEventHandler("Stats2ClientMech", function(data)
        
                Wait(300)
                SendNUIMessage({
                    type = "Stats2m",
                    Stats2m=data;
                })
            end)
        
            RegisterNUICallback("GetUbezpieczenieListMechanic", function(data)
                TriggerServerEvent("ServerMechanicListOfAmbulance",data)
                TriggerServerEvent("ServerMechanicListOfSheriff",data)
                Wait(300)
            end)
            
            RegisterNetEvent("makeTableAmbulance") 
            AddEventHandler("makeTableAmbulance", function(data)
                Wait(300)
                SendNUIMessage({
                    type = "makeTableAmbulance",
                    makeTableAmbulance=data;
                })
            end)
            
            RegisterNetEvent("makeTableSheriffMechanic") 
            AddEventHandler("makeTableSheriffMechanic", function(data)
                Wait(300)
                SendNUIMessage({
                    type = "makeTableSheriffMechanic",
                    makeTableSheriffMechanic=data;
                })
            end)



            RegisterNUICallback("StatsMech3", function(data)
                TriggerServerEvent("Stats3ServerMech",data)
                Wait(300)
            end)
            RegisterNetEvent("Stats3ClientMech") 
            AddEventHandler("Stats3ClientMech", function(data)
        
                Wait(300)
                SendNUIMessage({
                    type = "Stats3m",
                    Stats3m=data;
                })
            end)